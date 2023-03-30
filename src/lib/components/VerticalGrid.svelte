<script lang="ts">
  import { fade } from "svelte/transition";

  import { lightbox } from "$lib/stores/lightbox";

  export let images: App.Image[];
  const columns = images.reduce((acc, image, index) => {
    const columnIndex = index % 3;
    if (!acc[columnIndex]) {
      acc[columnIndex] = { images: [] };
    }
    acc[columnIndex].images.push(image);
    return acc;
  }, []);

  function openLightbox(column: App.Image[], index: number) {
    lightbox.set({
      open: true,
      images: column.images,
      currentImageIndex: index,
    });
  }
</script>

<div class="image-gallery" in:fade>
  {#each columns as column}
    <div class="column">
      {#each column.images as image, index}
        <div class="image-item" on:click={() => openLightbox(column, index)}>
          <img src={image.responsiveImage.src} alt="" />
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
  }

  .image-gallery .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-item img {
    width: 100%;
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
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
