<script lang="ts">
  import { page } from '$app/state';
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { getHomeGallery } from '#lib/cms.remote.js';
</script>

<svelte:head>
  <title>{page.status} | Tania McCrea Steele Photography</title>
</svelte:head>

<div class="error-wrapper">
  <p class="status">{page.status}</p>
  <h1>{page.status === 404 ? 'This page has wandered off.' : 'Something went wrong.'}</h1>
  <p class="message">
    {page.status === 404
      ? 'The page you were looking for isn’t here, but the photographs are.'
      : (page.error?.message ?? 'Please try again in a moment.')}
  </p>
  <div class="actions">
    <a class="button" href="/">Back home</a>
    <a class="button secondary" href="/gallery">Browse the gallery</a>
  </div>

  <svelte:boundary>
    {#snippet pending()}{/snippet}
    {#snippet failed()}{/snippet}
    <div class="recent">
      {#each (await getHomeGallery()).flat().slice(0, 3) as image (image.responsiveImage.src)}
        <a href="/gallery" class="thumb">
          <CustomImage data={image.responsiveImage} sizes="(min-width: 768px) 220px, 30vw" />
        </a>
      {/each}
    </div>
  </svelte:boundary>
</div>

<style>
  .error-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 2rem 1rem;
    gap: 0.75rem;
  }

  .status {
    font-family: 'Playfair Display', serif;
    font-size: 4.5rem;
    line-height: 1;
    color: var(--color-accent);
  }

  h1 {
    font-size: 1.75rem;
    color: var(--color-ink);
  }

  .message {
    font-size: 15px;
    color: var(--color-gray-600);
    max-width: 420px;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .button {
    display: inline-block;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    font-size: 14px;
    background: var(--color-accent);
    color: #fff;
    border: 1px solid var(--color-accent);
    transition: background 180ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
  }

  .button.secondary {
    background: transparent;
    color: var(--color-accent-strong);
  }

  .button.secondary:hover {
    background: var(--color-accent-soft);
  }

  .recent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-top: 2.5rem;
    width: 100%;
    max-width: 700px;
  }

  .thumb {
    display: block;
    aspect-ratio: 1;
    border-radius: 6px;
    overflow: hidden;
  }

  .thumb :global(img) {
    transition: transform 600ms ease;
  }

  .thumb:hover :global(img) {
    transform: scale(1.04);
  }
</style>
