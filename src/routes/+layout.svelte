<script lang="ts">
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import '../app.css';
  import { lightbox } from '$lib/stores/lightbox';
  import Nav from '$lib/components/Nav.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';
  import type { Image } from '../types';
  import { dev } from '$app/environment';

  export let data: PageData;

  let showLightbox = false;
  let lightboxImageIndex = 0;

  const customSectionTitle = 'Gallery';
  const customPages = data.allGalleryCollections.map(gallery => {
    return { title: gallery.title, url: gallery.url };
  });

  let lightboxImages: Image[] = [];

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

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Tania McCrea Steele Photography",
      "image": "https://www.taniamccreasteele.com/tms-site.jpg",
      "url": "https://www.taniamccreasteele.com",
      "telephone": "",
      "priceRange": "££",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bradford on Avon",
        "addressRegion": "Wiltshire",
        "addressCountry": "UK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.347,
        "longitude": -2.250
      },
      "sameAs": []
    }
  </script>`}
  {#if !dev}
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="50618c95-a29f-4e43-a261-a63c9936df17"
    ></script>
  {/if}
</svelte:head>

<Lightbox bind:open={showLightbox} images={lightboxImages} currentImageIndex={lightboxImageIndex} />

<div class="md:hidden">
  <MobileNav {customSectionTitle} {customPages} />
</div>

<aside class="hidden md:block fixed top-0 left-0 h-full">
  <Nav {customSectionTitle} {customPages} />
</aside>

<main class="ml-0 flex-grow p-4 flex md:w-full md:ml-[343px] md:p-[40px_40px_40px_0]">
  <slot />
</main>

<div class="w-full h-[80px] flex justify-center items-center md:hidden">
  <Footer />
</div>
