<script>
  // TODO:
  // 1. add store (x)
  // 2. animations (x)
  // 3. editable list item

  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { createEventDispatcher, afterUpdate } from "svelte";

  export let toDoItems;

  const dispatch = createEventDispatcher();

  let allItems = [...toDoItems];
  let allDone = false;
  let newItemToDo = "";

  $: itemsToDo = allItems.filter(item => !item.completed);
  $: itemsDone = allItems.filter(item => item.completed);

  $: if (!itemsToDo.length) {
    allDone = true;
    dispatch("message", {
      text: "All items completed!",
      itemsToDo,
      itemsDone
    });
  } else {
    allDone = false;
    dispatch("message", {
      text: "",
      itemsToDo,
      itemsDone
    });
  }

  //   afterUpdate(() => {
  //     allItems = [...toDoItems];
  //   });

  const addItemToDo = () => {
    allItems = [
      ...allItems,
      {
        id: allItems.length + 1,
        completed: false,
        value: newItemToDo,
        editing: false
      }
    ];
  };

  const markAllAsDone = () => {
    allItems = allItems.map(item => ({ ...item, completed: !allDone }));
  };

  const onItemRemove = id => {
    allItems = allItems
      .filter(item => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
  };
</script>

<style lang="scss">
  .list-container {
    .list-heading {
      font-size: 1.2em;
    }
    .todo-list {
      list-style-type: none;
      margin: 0;
      padding: 0;

      .items-todo,
      .items-done {
        border: 1px solid gray;
        padding: 10px 10px 3px;
      }

      .items-done {
        background: salmon;
      }
    }

    .space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin: 5px 0;

      .list-label {
        display: inline-block;
        cursor: pointer;
      }
    }

    .check-all {
      font-size: 0.875em;
      font-weight: bold;
    }
  }
</style>

<div class="list-container">
  <div class="space-between">
    <input type="text" placeholder="Add a To-do" bind:value={newItemToDo} />
    <button on:click={addItemToDo}>Add</button>
  </div>

  {#if itemsToDo.length}
    <h2 class="list-heading">To-Do</h2>
  {/if}
  <ul class="todo-list">
    {#each itemsToDo as item}
      <li
        class="items-todo space-between"
        transition:fly={{ delay: 0, duration: 1000, x: 0, y: 500, opacity: 0, easing: quintOut }}>
        <span>
          <input type="checkbox" id={item.id} bind:checked={item.completed} />
          <label class="list-label" for={item.id}>{item.value}</label>
        </span>
        <button on:click={() => onItemRemove(item.id)}>Remove</button>
      </li>
    {/each}
  </ul>

  <div class="check-all space-between">
    <span>
      <input
        id="checkAll"
        type="checkbox"
        on:click={markAllAsDone}
        bind:checked={allDone} />
      <label class="list-label" for="checkAll">Check All</label>
    </span>
    <div>Items Remaining: {itemsToDo.length}</div>
  </div>

  {#if itemsDone.length}
    <h2 class="list-heading">Done</h2>
  {/if}
  <ul class="todo-list">
    {#each itemsDone as item}
      <li class="items-done space-between" transition:fade>
        <span>
          <input type="checkbox" id={item.id} bind:checked={item.completed} />
          <label class="list-label" for={item.id}>{item.value}</label>
        </span>
        <button on:click={() => onItemRemove(item.id)}>Remove</button>
      </li>
    {/each}
  </ul>
</div>
