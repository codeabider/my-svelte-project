<script>
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { onMount } from "svelte";

  import { toDoItems } from "./store/store";

  import ToDoList from "./components/ToDoList.svelte";

  export let name;

  let allItems = [];
  let messageFromChild;
  let itemsToDo;
  let itemsDone;

  const getListItems = async () => {
    const res = await fetch(`data/list-items.json`);
    allItems = await res.json();

    toDoItems.set({ itemsToDo: allItems, itemsDone: [] }); // set list to store
    messageFromChild = "";
    // console.log("getListItems", allItems, $toDoItems);
  };

  onMount(getListItems);

  const showMessageFromChild = event => {
    messageFromChild = event.detail.text;
    itemsToDo = event.detail.itemsToDo;
    itemsDone = event.detail.itemsDone;

    toDoItems.update(() => ({
      itemsToDo,
      itemsDone
    })); // update list in store

    console.log("updated in store: ", $toDoItems);
  };
</script>

<style lang="scss">
  .main-container {
    max-width: 60%;
    margin: 0 auto;

    .app-heading {
      text-align: center;
      font-size: 1.5em;
    }

    .received-message {
      font-weight: bold;
      font-size: 1.25em;
      color: olive;
      text-align: center;
    }
  }
</style>

<div class="main-container">
  <h1 class="app-heading">To-Do List using {name}</h1>
  {#if $toDoItems.itemsToDo.length}
    <ToDoList
      toDoItems={$toDoItems.itemsToDo}
      on:message={showMessageFromChild} />
  {/if}
  {#if messageFromChild}
    <p
      class="received-message"
      transition:fly={{ delay: 0, duration: 1000, x: 1000, y: 0, opacity: 0, easing: quintOut }}>
      {messageFromChild}
    </p>
  {/if}
  {#if !$toDoItems.itemsToDo.length}
    <button on:click={getListItems}>Reset List</button>
  {/if}
</div>
