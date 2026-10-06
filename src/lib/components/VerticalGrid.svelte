<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { openLightbox } from '#lib/lightbox.svelte.js';
  import type { Image } from '#lib/types.js';

  let { images, context = '' }: { images: Image[]; context?: string } = $props();

  let columns = $derived([
    images.filter((_, i) => i % 2 === 0),
    images.filter((_, i) => i % 2 === 1),
  ]);
</script>

<div class="image-gallery">
  {#each columns as column, columnIndex}
    <div class="column">
      {#each column as image, imageIndex}
        <button
          class="image-item"
          onclick={() => openLightbox(images, columnIndex + imageIndex * 2, context)}
        >
          <CustomImage
            data={image.responsiveImage}
            sizes="(min-width: 1024px) calc((100vw - 350px) / 2), (min-width: 768px) calc((100vw - 42px) / 2), calc(100vw - 32px)"
          />
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .image-gallery {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-gallery .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-item {
    padding: 0;
  }

  .image-item :global(div) {
    border-radius: 5px;
  }

  @media only screen and (min-width: 768px) {
    .image-gallery {
      flex-direction: row;
    }

    .image-gallery .column {
      width: 50%;
    }
  }
</style>
