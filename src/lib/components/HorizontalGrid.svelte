<script lang="ts">
  import CustomImage from '$lib/components/CustomImage.svelte';
  import { lightbox } from "$lib/stores/lightbox";

  export let images: App.Image[];

  function openLightbox(index: number) {
    lightbox.set({
      open: true,
      images,
      currentImageIndex: index,
    });
  }
</script>

<div class="container">
  <ul class="image-gallery">
    {#each images as image, index}
      <li class="image-item">
        <button
          class="w-full h-full p-0 border-none bg-transparent cursor-pointer"
          on:click={() => openLightbox(index)}
          on:keyup={(e) => e.key === 'Enter' && openLightbox(index)}
        >
          <CustomImage data={image.responsiveImage} />
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
    content: "";
    flex-grow: 999;
  }
</style>
