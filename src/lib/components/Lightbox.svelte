<script lang="ts">
  import CustomImage from '$lib/components/CustomImage.svelte';
  import { Dialog } from 'bits-ui';
  import { X, ArrowRight, ArrowLeft } from 'lucide-svelte';
  import type { Image } from '../../types';

  export let images: Image[] = [];
  export let open = false;
  export let currentImageIndex = 0;

  let internalIndex = currentImageIndex;

  $: if (open) {
    internalIndex = currentImageIndex;
  }

  $: currentImage = images.length > 0 ? images[internalIndex] : null;

  function nextImage() {
    if (images.length > 0) {
      internalIndex = (internalIndex + 1) % images.length;
    }
  }

  function previousImage() {
    if (images.length > 0) {
      internalIndex = (internalIndex - 1 + images.length) % images.length;
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-[#fff]/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-sm border bg-[#fff] px-4 py-16 sm:p-16 shadow-popover outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-h-[80%] md:w-full flex flex-col"
    >
      <div class="flex-1 overflow-hidden">
        <div class="h-[50vh] sm:h-[60vh] flex items-center lightbox-image">
          {#if currentImage}
            <CustomImage data={currentImage.responsiveImage} />
          {/if}
        </div>
      </div>

      <div
        class="absolute bottom-5 inset-x-0 mx-auto flex justify-between items-center max-w-[300px]"
      >
        <button onclick={previousImage}>
          <ArrowLeft class="size-6 text-foreground" />
        </button>
        <p
          class="text-sm italic font-light flex-1 text-center min-w-[100px] text-[var(--color-gray-700)]"
        >
          {internalIndex + 1} of {images.length}
        </p>
        <button onclick={nextImage}>
          <ArrowRight class="size-6 text-foreground" />
        </button>
      </div>

      <Dialog.Close
        class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
      >
        <div>
          <X class="size-5 text-foreground" />
          <span class="sr-only">Close</span>
        </div>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .lightbox-image :global(div) {
    width: 100%;
    height: 100%;
  }

  .lightbox-image :global(div > img) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
    object-position: center;
  }

  .lightbox-image :global(img) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
    object-position: center;
  }
</style>
