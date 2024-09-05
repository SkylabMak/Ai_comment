import { writable } from 'svelte/store';
export const alldataStore = writable<Alldata | null>(null); 
