<script lang="ts">
  import { fade } from "svelte/transition";

  export let images: App.Image[];

  let currentImageIndex = 0;
  let currentImage = images[currentImageIndex];

  function moveCarousel(direction: number) {
    if (direction === 1) {
      if (currentImageIndex === images.length - 1) {
        currentImageIndex = 0;
      } else {
        currentImageIndex++;
      }
    } else {
      if (currentImageIndex === 0) {
        currentImageIndex = images.length - 1;
      } else {
        currentImageIndex--;
      }
    }

    currentImage = images[currentImageIndex];
  }

  function selectImage(index: number) {
    currentImageIndex = index;
    currentImage = images[currentImageIndex];
  }
</script>

<div class="showcase-wrapper">
  <div class="showcase-image">
    <button on:click={() => moveCarousel(-1)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="#4b5563"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    {#key currentImageIndex}
      <img src={currentImage.responsiveImage.src} alt="" in:fade />
    {/key}
    <button on:click={() => moveCarousel(1)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5L16 12L9 19"
          stroke="#4b5563"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>

  <div class="image-slider">
    {#each images as image, index}
      <div
        class="image-item"
        on:click={() => selectImage(index)}
        on:keyup={() => selectImage(index)}
      >
        <img
          class:active={currentImageIndex === index}
          src={image.responsiveImage.src}
          alt=""
        />
      </div>
    {/each}
  </div>
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  .showcase-image {
    /* width: 100%; */
    /* height: 500px; */
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .showcase-image svg {
    cursor: pointer;
  }

  .showcase-image img {
    object-fit: cover;
    height: 550px;
    max-width: 85%;
    vertical-align: middle;
  }

  .image-slider {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    margin: 0 auto;
    overflow: hidden;
  }

  .image-slider img {
    height: 75px;
    object-fit: cover;
    cursor: pointer;
    filter: saturate(0%);
    transition: filter 0.2s ease-in-out;
  }

  .image-slider img:hover,
  .image-slider img.active {
    filter: saturate(100%);
  }
</style>
