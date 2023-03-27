import { writable } from "svelte/store";

export const lightbox = writable({
  open: false,
  images: [],
  currentImageIndex: 0,
});
