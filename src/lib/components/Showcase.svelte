<script lang="ts">
  import { Image } from "@datocms/svelte";

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
</script>

<div class="showcase-wrapper">
  <div class="showcase-image">
    <button aria-label="previous" on:click={() => moveCarousel(-1)}>
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
      <div class="image-container">
        <Image data={currentImage.responsiveImage} />
      </div>
    {/key}
    <button aria-label="next" on:click={() => moveCarousel(1)}>
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
</div>

<style>
  .showcase-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    height: 600px;
  }

  .showcase-image {
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

  .image-container :global(div) {
    height: 100%;
    max-height: 600px;
    max-width: 85%;
    margin: 0 auto;
  }

  .image-container :global(img) {
    object-fit: contain;
    height: 100%;
  }

  .image-container :global(.placeholder) {
    scale: 100% !important;
  }
</style>
