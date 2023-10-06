<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import { Image } from "@datocms/svelte";

  export let data: PageData;

  const columns = data.startPageCollection.startPageGallery;
</script>

<svelte:head>
  <meta property="og:image" content="./tms-site.png" />
  <meta property="og:title" content="Tania McCrea Steele Photography" />
  <meta property="og:url" content="https://www.taniamccreasteele.com" />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="image-gallery" in:fade>
  {#each columns as column}
    <div class="column">
      {#each column.images as image}
        <div class="image-item">
          <Image data={image.responsiveImage} />
        </div>
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
