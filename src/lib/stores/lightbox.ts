import { writable } from "svelte/store";
import type { Image } from "../../types";

interface Lightbox {
  open: boolean;
  images: Image[];
  currentImageIndex: number;
}

export const lightbox = writable<Lightbox>({
  open: false,
  images: [],
  currentImageIndex: 0,
});
