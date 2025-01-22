<script lang="ts">
  import type { PageData } from './$types';
  import { Image as DatoImage } from '@datocms/svelte';
  import { lightbox } from '$lib/stores/lightbox';
  import type { Image } from '../types';

  export let data: PageData;

  const columns = data.startPageCollection.startPageGallery;
  const allImages = columns.reduce((acc, column) => {
    return [...acc, ...column.images];
  }, [] as Image[]);

  function openLightbox(index: number) {
    lightbox.set({
      open: true,
      images: allImages,
      currentImageIndex: index,
    });
  }
</script>

<svelte:head>
  <meta property="og:image" content="./tms-site.jpg" />
  <meta property="og:title" content="Tania McCrea Steele Photography" />
  <meta property="og:url" content="https://www.taniamccreasteele.com" />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="image-gallery">
  {#each columns as column}
    <div class="column">
      {#each column.images as image, i}
        {@const absoluteIndex =
          columns.indexOf(column) === 0
            ? i
            : columns
                .slice(0, columns.indexOf(column))
                .reduce((acc, col) => acc + col.images.length, 0) + i}
        <button class="image-item" on:click={() => openLightbox(absoluteIndex)}>
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
    width: 100%;
  }

  .image-gallery .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-item {
    width: 100%;
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
