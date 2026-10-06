import type { Image } from '#lib/types.js';

export const lightbox = $state({
  open: false,
  images: [] as Image[],
  currentImageIndex: 0,
  context: '',
});

export function openLightbox(images: Image[], index: number, context = '') {
  lightbox.images = images;
  lightbox.currentImageIndex = index;
  lightbox.context = context;
  lightbox.open = true;
}

export function closeLightbox() {
  lightbox.open = false;
}
