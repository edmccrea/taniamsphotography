<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div class="image-gallery" in:fade>
  <div class="column">
    <div class="image-item">
      <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
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
</div>

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
