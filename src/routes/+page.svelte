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

<div class="flex flex-col gap-[10px] w-full md:flex-row">
  {#each columns as column}
    <div class="flex flex-col gap-[10px] md:w-1/3">
      {#each column.images as image, i}
        {@const absoluteIndex =
          columns.indexOf(column) === 0
            ? i
            : columns
                .slice(0, columns.indexOf(column))
                .reduce((acc, col) => acc + col.images.length, 0) + i}
        <button class="w-full p-0 [&_div]:rounded-[5px]" on:click={() => openLightbox(absoluteIndex)}>
          <DatoImage data={image.responsiveImage} />
        </button>
      {/each}
    </div>
  {/each}
</div>
