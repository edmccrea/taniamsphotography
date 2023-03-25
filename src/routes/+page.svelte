<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  const columns = data.startPageCollection.startPageGallery;
  console.log(data);
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

<!-- <div class="column">
    <div class="image-item">
      <img
        src={data.startPageCollection.startPageGallery[0].images[0].url}
        alt=""
      />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
    </div>
  </div>

  <div class="column" in:fade>
    <div class="image-item">
      <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/KTVn62x6fFw" alt="" />
    </div>
  </div>

  <div class="column" in:fade>
    <div class="image-item">
      <img src="https://source.unsplash.com/VSeVhmW4_JQ" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/07aFaTf24Kg" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/DqyYTM7pR2o" alt="" />
    </div>
    <div class="image-item">
      <img src="https://source.unsplash.com/IdNOTjPeHrE" alt="" />
    </div>
  </div>
</div> -->
<style>
  .image-gallery {
    /* Mobile first */
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
