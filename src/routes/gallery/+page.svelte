<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { getGalleryIndex } from '#lib/cms.remote.js';

  const collections = await getGalleryIndex();
</script>

<svelte:head>
  <title>Gallery | Tania McCrea Steele Photography</title>
  <meta
    name="description"
    content="Browse landscape and wildlife photography collections by Tania McCrea Steele, Bradford on Avon, Wiltshire."
  />
</svelte:head>

<div class="collections-wrapper">
  <h1>Gallery.</h1>

  <div class="grid">
    {#each collections as collection, i (collection.url)}
      <a href="/gallery/{collection.url}" class="collection-card">
        <div class="image-container">
          {#if collection.cover}
            <CustomImage
              data={collection.cover.responsiveImage}
              loading={i < 3 ? 'eager' : 'lazy'}
              sizes="(min-width: 1024px) calc((100vw - 388px) / 3), (min-width: 768px) calc((100vw - 56px) / 2), calc(100vw - 32px)"
            />
          {/if}
          <div class="overlay">
            <h2>{collection.title}</h2>
          </div>
          <span class="count" aria-label="{collection.count} photographs">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="4.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" />
              <path
                d="M11.5 11.5v1a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1"
                stroke="currentColor"
              />
            </svg>
            {collection.count}
          </span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .collections-wrapper {
    width: 100%;
    margin-top: 1rem;
  }

  h1 {
    font-size: 2rem;
    color: var(--color-ink);
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem 1.5rem;
  }

  .collection-card {
    display: block;
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    cursor: pointer;
  }

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
  }

  .image-container :global(img) {
    transition: transform 700ms ease-in-out;
  }

  .collection-card:hover .image-container :global(img) {
    transform: scale(1.04);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }

  .collection-card:hover .overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    padding: 1rem;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
  }

  .count {
    position: absolute;
    right: 0.6rem;
    bottom: 0.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.5rem 0.2rem 0.4rem;
    border-radius: 999px;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.92);
    background: rgba(20, 20, 18, 0.45);
    backdrop-filter: blur(4px);
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .collection-card:hover .count,
  .collection-card:focus-visible .count {
    opacity: 1;
    transform: none;
  }

  @media (hover: none) {
    .count {
      opacity: 1;
      transform: none;
    }
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .collections-wrapper {
      margin-top: 3rem;
    }

    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
