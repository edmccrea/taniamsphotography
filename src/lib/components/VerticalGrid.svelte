<script lang="ts">
  import { fade } from "svelte/transition";

  export let images: App.Image[];
  const columns = images.reduce((acc, image, index) => {
    const columnIndex = index % 3;
    if (!acc[columnIndex]) {
      acc[columnIndex] = { images: [] };
    }
    acc[columnIndex].images.push(image);
    return acc;
  }, []);
</script>

<div class="image-gallery" in:fade>
  {#each columns as column}
    <div class="column">
      {#each column.images as image}
        <div class="image-item">
          <img src={image.url} alt="" />
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
    width: 33%;
  }

  .image-item img {
    width: 100%;
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (min-width: 768px) {
    .image-gallery {
      flex-direction: row;
    }
  }
</style>
