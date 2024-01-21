<script lang="ts">
  import { get } from "svelte/store";
  import type { PageData } from "./$types";

  import "../app.css";
  import { lightbox } from "$lib/stores/lightbox";
  import Nav from "$lib/components/Nav.svelte";
  import Lightbox from "$lib/components/Lightbox.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MobileNav from "$lib/components/MobileNav.svelte";

  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  inject({ mode: dev ? "development" : "production" });

  export let data: PageData;

  let showLightbox = false;
  let lightboxImageIndex = 0;

  const customSectionTitle = "Gallery";
  const customPages = data.allGalleryCollections.map((gallery) => {
    return { title: gallery.title, url: gallery.url };
  });

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

<div class="mobile-nav">
  <MobileNav {customSectionTitle} {customPages} />
</div>

<aside>
  <Nav {customSectionTitle} {customPages} />
</aside>

<main>
  <slot />
</main>

<div class="mobile-footer">
  <Footer />
</div>

<style>
  :global(body) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  aside {
    display: none;
  }

  main {
    margin-left: 0;
    flex-grow: 1;
    padding: 1rem;
    display: flex;
  }

  .mobile-footer {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) {
    :global(body) {
      flex-direction: row;
    }
    aside {
      display: block;
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

    .mobile-nav {
      display: none;
    }

    .mobile-footer {
      display: none;
    }
  }
</style>
