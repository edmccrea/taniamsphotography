<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { openLightbox } from '#lib/lightbox.svelte.js';
  import type { Image } from '#lib/types.js';

  let { images, context = '' }: { images: Image[]; context?: string } = $props();
</script>

<div>
  <ul class="image-gallery">
    {#each images as image, index}
      <li class="image-item">
        <button
          class="w-full h-full p-0 border-none bg-transparent cursor-pointer"
          onclick={() => openLightbox(images, index, context)}
        >
          <CustomImage
            data={image.responsiveImage}
            sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
          />
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .image-gallery > li {
    height: 300px;
    cursor: pointer;
    position: relative;
    flex: 1 1 auto;
  }

  .image-item :global(div) {
    border-radius: 5px;
  }

  .image-gallery::after {
    content: '';
    flex-grow: 999;
  }
</style>
