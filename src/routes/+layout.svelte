<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { dev } from '$app/env';
  import '../app.css';
  import { lightbox, closeLightbox } from '#lib/lightbox.svelte.js';
  import Nav from '#lib/components/Nav.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import MobileNav from '#lib/components/MobileNav.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  type LightboxComponent = typeof import('#lib/components/Lightbox.svelte').default;
  let Lightbox = $state<LightboxComponent | null>(null);

  async function loadLightbox() {
    if (Lightbox) return;
    Lightbox = (await import('#lib/components/Lightbox.svelte')).default;
  }

  onMount(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 500));
    idle(() => void loadLightbox());
  });

  $effect(() => {
    if (lightbox.open) void loadLightbox();
  });
</script>

<svelte:head>
  <link rel="canonical" href={page.url.href} />
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Tania McCrea Steele Photography",
      "image": "https://www.taniamccreasteele.com/og-image.jpg",
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

{#if Lightbox}
  <Lightbox
    open={lightbox.open}
    images={lightbox.images}
    currentImageIndex={lightbox.currentImageIndex}
    context={lightbox.context}
    onclose={closeLightbox}
  />
{/if}

<MobileNav />

<aside class="hidden lg:block fixed top-0 left-0 h-full">
  <Nav />
</aside>

<main class="ml-0 flex-grow min-w-0 p-4 grid lg:w-full lg:ml-[300px] lg:p-[40px_40px_40px_0]">
  <div class="w-full h-full min-w-0 col-start-1 row-start-1">
    {@render children()}
  </div>
</main>

<div class="w-full h-[80px] flex justify-center items-center lg:hidden">
  <Footer />
</div>
