import { writable } from 'svelte/store';
export const alldataStore = writable<Alldata | null>(null); 
export const testString = writable<string | null>(null); ; 
