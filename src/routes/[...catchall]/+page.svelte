<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import HorizontalGrid from "$lib/components/HorizontalGrid.svelte";
  import VerticalGrid from "$lib/components/VerticalGrid.svelte";
  import Showcase from "$lib/components/Showcase.svelte";

  export let data: PageData;

  let width: number;

  $: pageType = data.pageType;
  $: galleryData = data.galleryCollection.gallery.find(
    (gallery) => gallery.title.toLowerCase() === pageType
  );
</script>

<svelte:window bind:innerWidth={width} />
{#key pageType}
  <div class="gallery-wrapper" in:fade>
    <h1>{galleryData.title}.</h1>

    {#if width < 768}
      <VerticalGrid images={galleryData.images} />
    {:else if galleryData.displayType === "horizontal"}
      <HorizontalGrid images={galleryData.images} />
    {:else if galleryData.displayType === "vertical"}
      <VerticalGrid images={galleryData.images} />
    {:else}
      <Showcase images={galleryData.images} />
    {/if}
  </div>
{/key}

<style>
  .gallery-wrapper {
    margin-top: 3rem;
  }

  h1 {
    font-size: 2rem;
    color: var(--color-gray-700);
    margin-bottom: 1rem;
  }
</style>
