import { writable } from 'svelte/store';

export const toDoItems = writable({ itemsToDo: [], itemsDone: [] });
