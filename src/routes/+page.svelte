<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  const columns = data.startPageCollection.startPageGallery;
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
