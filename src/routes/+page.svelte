<script lang="ts">
  import type { PageData } from './$types';
  import CustomImage from '$lib/components/CustomImage.svelte';
  import { lightbox } from '$lib/stores/lightbox';
  import type { Image } from '../types';
  import { animate, stagger } from 'motion';
  import { onMount } from 'svelte';

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

  onMount(() => {
    animate(
      '.column-wrapper',
      { opacity: [0, 1], y: [20, 0], visibility: "visible" } as any,
      { delay: stagger(0.1), duration: 0.4, easing: 'ease-out' } as any
    );
  });
</script>

<svelte:head>
  <title>Tania McCrea Steele Photography | Bradford on Avon</title>
  <meta
    name="description"
    content="Professional landscape and wildlife photography by Tania McCrea Steele, based in Bradford on Avon, Wiltshire. View the gallery and shop prints."
  />
  <meta property="og:image" content="./tms-site.jpg" />
  <meta property="og:title" content="Tania McCrea Steele Photography | Bradford on Avon" />
  <meta property="og:url" content="https://www.taniamccreasteele.com" />
  <meta property="og:type" content="website" />
</svelte:head>

<h1 class="sr-only">Tania McCrea Steele Photography - Bradford on Avon</h1>

<div class="flex flex-col gap-[10px] w-full md:flex-row">
  {#each columns as column}
    <div 
      class="column-wrapper flex flex-col gap-[10px] md:w-1/3" 
      style="opacity: 0; visibility: hidden;"
    >
      {#each column.images as image, i}
        {@const absoluteIndex =
          columns.indexOf(column) === 0
            ? i
            : columns
                .slice(0, columns.indexOf(column))
                .reduce((acc, col) => acc + col.images.length, 0) + i}
        
        <button 
          class="w-full p-0 [&_div]:rounded-[5px] overflow-hidden [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-in-out hover:[&_img]:scale-105" 
          on:click={() => openLightbox(absoluteIndex)}
        >
          <CustomImage data={image.responsiveImage} />
        </button>
      {/each}
    </div>
  {/each}
</div>


