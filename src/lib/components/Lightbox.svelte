<script lang="ts">
  import { Image } from "@datocms/svelte";
  import { fade } from "svelte/transition";

  export let images: App.Image[];
  export let open = false;
  export let currentImageIndex = 0;

  let currentImage = images[currentImageIndex];

  function closeModal() {
    open = false;
  }
</script>

<svelte:head>
  {#if open}
    <style>
      body {
        overflow: hidden !important;
      }
    </style>
  {/if}
</svelte:head>

{#if open}
  <div class="lightbox-bg" on:click={closeModal} on:keyup={closeModal}>
    <div
      class="lightbox"
      on:click|stopPropagation
      on:keyup|stopPropagation
      transition:fade={{ duration: 150 }}
    >
      <button aria-label="close" on:click={closeModal}
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#4b5563"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg></button
      >
      <div class="image-wrapper">
        <Image data={currentImage.responsiveImage} />
      </div>
    </div>
  </div>
{/if}

<style>
  .lightbox-bg {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .lightbox {
    width: 95%;
    height: 50%;
    background-color: white;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .image-wrapper {
    width: 90%;
    height: 80%;
  }

  .image-wrapper :global(div) {
    height: 100%;
  }

  :global(img) {
    height: 100% !important;
    object-fit: contain;
    scale: 100% !important;
  }

  @media (min-width: 768px) {
    .lightbox {
      width: 75%;
      height: 80%;
    }
  }
</style>
