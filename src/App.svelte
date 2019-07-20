<script>
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { toDoItems } from "./store/store";

  import ToDoList from "./components/ToDoList.svelte";

  export let name;

  let messageFromChild;
  let itemsLeft;
  //   const toDoItems = [
  //     {
  //       id: 1,
  //       completed: false,
  //       value: "Milk",
  //       editing: false
  //     },
  //     {
  //       id: 2,
  //       completed: false,
  //       value: "PS 4",
  //       editing: false
  //     },
  //     {
  //       id: 3,
  //       completed: false,
  //       value: "Soundbox",
  //       editing: false
  //     }
  //   ];

  const showMessageFromChild = event => {
    messageFromChild = event.detail.text;
    itemsLeft = event.detail.itemsLeft;

    toDoItems.update(() => itemsLeft);

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
  <ToDoList toDoItems={$toDoItems} on:message={showMessageFromChild} />
  {#if messageFromChild}
    <p
      class="received-message"
      transition:fly={{ delay: 0, duration: 1000, x: 1000, y: 0, opacity: 0, easing: quintOut }}>
      {messageFromChild}
    </p>
  {/if}
</div>
