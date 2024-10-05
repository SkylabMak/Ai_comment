import { writable } from 'svelte/store';
export const alldataStore = writable<Alldata | null>(null);
export const alldataComment = writable<AlldataComment[] | null>(null);
