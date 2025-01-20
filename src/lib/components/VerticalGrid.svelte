<script lang="ts">
  import { Image as DatoImage } from '@datocms/svelte';
  import type { Image } from '../../types';
  import { lightbox } from '$lib/stores/lightbox';

  export let images: Image[];

  interface Column {
    images: Image[];
  }

  const columns = images.reduce<Column[]>((acc, image, index) => {
    const columnIndex = index % 3;
    if (!acc[columnIndex]) {
      acc[columnIndex] = { images: [] };
    }
    acc[columnIndex].images.push(image);
    return acc;
  }, []);

  function openLightbox(images: Image[], index: number) {
    lightbox.set({
      open: true,
      images,
      currentImageIndex: index,
    });
  }
</script>

<div class="image-gallery">
  {#each columns as column}
    <div class="column">
      {#each column.images as image, index}
        <button class="image-item" on:click={() => openLightbox(column.images, index)}>
          <DatoImage data={image.responsiveImage} />
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
      width: 33%;
    }
  }
</style>
