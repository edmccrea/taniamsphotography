<script lang="ts">
  import HorizontalGrid from '#lib/components/HorizontalGrid.svelte';
  import VerticalGrid from '#lib/components/VerticalGrid.svelte';
  import Showcase from '#lib/components/Showcase.svelte';
  import { getGallery } from '#lib/cms.remote.js';

  let { params } = $props();

  const gallery = $derived(await getGallery(params.galleryName));
</script>

<svelte:head>
  <title>{gallery.title} | Tania McCrea Steele Photography</title>
</svelte:head>

{#key params.galleryName}
  <div class="gallery-wrapper">
    <div class="page-heading">
      <a class="back" href="/gallery">← All collections</a>
      <h1>{gallery.title}.</h1>
    </div>

    {#if gallery.displayType === 'vertical'}
      <VerticalGrid images={gallery.images} context={gallery.title} />
    {:else}
      <div class="md:hidden">
        <VerticalGrid images={gallery.images} context={gallery.title} />
      </div>
      <div class="hidden md:block">
        {#if gallery.displayType === 'horizontal'}
          <HorizontalGrid images={gallery.images} context={gallery.title} />
        {:else}
          <Showcase images={gallery.images} />
        {/if}
      </div>
    {/if}
  </div>
{/key}

<style>
  .page-heading {
    margin-bottom: 1.5rem;
  }

  .back {
    display: inline-block;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--color-gray-500);
    margin-bottom: 0.75rem;
    transition: color 180ms ease;
  }

  .back:hover {
    color: var(--color-accent-strong);
  }

  h1 {
    font-size: 2rem;
    color: var(--color-ink);
  }

  @media (min-width: 1024px) {
    .gallery-wrapper {
      margin-top: 3rem;
      width: 100%;
    }
  }
</style>
