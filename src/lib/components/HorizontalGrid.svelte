<script lang="ts">
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
      <li on:click={() => openLightbox(index)}>
        <img src={image.responsiveImage.src} alt="" />
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

  .image-gallery li img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 5px;
  }

  .image-gallery::after {
    content: "";
    flex-grow: 999;
  }
</style>
