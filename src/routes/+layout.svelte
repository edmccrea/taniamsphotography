<script lang="ts">
  import { get } from "svelte/store";
  import type { PageData } from "./$types";

  import { lightbox } from "../lib/stores/lightbox";
  import "../app.css";
  import Nav from "../lib/components/Nav.svelte";
  import Lightbox from "../lib/components/Lightbox.svelte";

  export let data: PageData;
  let showLightbox = false;
  let lightboxImageIndex = 0;

  const customSectionTitle = data.galleryCollection.title;
  const customPages = data.galleryCollection.gallery.map(
    (gallery) => gallery.title
  );

  let lightboxImages: App.Image[];

  function handleLightboxChange() {
    const lightboxValue = get(lightbox);
    if (lightboxValue.open) {
      lightboxImageIndex = lightboxValue.currentImageIndex;
      lightboxImages = lightboxValue.images;
      showLightbox = true;
    } else {
      showLightbox = false;
    }
  }

  $: $lightbox, handleLightboxChange();
</script>

{#if showLightbox}
  <Lightbox
    bind:open={showLightbox}
    images={lightboxImages}
    currentImageIndex={lightboxImageIndex}
  />
{/if}

<aside>
  <Nav {customSectionTitle} {customPages} />
</aside>

<main>
  <slot />
</main>

<style>
  @media (min-width: 768px) {
    :global(body) {
      min-height: 100vh;
      display: flex;
    }

    aside {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    main {
      width: 100%;
      margin-left: 343px;
      padding: 40px 40px 40px 0;
    }
  }
</style>
