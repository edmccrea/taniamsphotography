<script lang="ts">
  import type { BlogCard } from '#lib/types.js';
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { distinctExcerpt, formatDate } from '#lib/format.js';

  let {
    cardData,
    featured = false,
    compact = false,
  }: {
    cardData: BlogCard;
    featured?: boolean;
    compact?: boolean;
  } = $props();

  let excerpt = $derived(distinctExcerpt(cardData.excerpt, cardData.title));
</script>

<a class="card" class:featured class:compact href="/blog/{cardData.url}">
  <div class="img-container">
    <CustomImage
      data={cardData.cardImage.responsiveImage}
      loading={featured ? 'eager' : 'lazy'}
      fetchpriority={featured ? 'high' : 'auto'}
      sizes={featured
        ? '(min-width: 1024px) 640px, calc(100vw - 32px)'
        : '(min-width: 768px) 400px, calc(100vw - 32px)'}
    />
  </div>
  <div class="meta">
    <time datetime={cardData.publishDate}>{formatDate(cardData.publishDate)}</time>
    <h3>{cardData.title}</h3>
    {#if excerpt}
      <p>{excerpt}</p>
    {/if}
    {#if featured}
      <span class="read">Read the post</span>
    {/if}
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    color: var(--color-ink);
    text-decoration: none;
  }

  .img-container {
    aspect-ratio: 3 / 2;
    overflow: hidden;
    width: 100%;
    border-radius: 5px;
  }

  .img-container :global(img) {
    transition: transform 350ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .card:hover :global(img) {
    transform: scale(1.03);
  }

  .meta {
    padding-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  time {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--color-gray-500);
  }

  h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 180ms ease;
  }

  .card:hover h3 {
    color: var(--color-accent-strong);
  }

  p {
    margin-top: 0.1rem;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-gray-600);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .read {
    display: none;
    margin-top: 0.75rem;
    font-size: 13px;
    color: var(--color-accent-strong);
    width: fit-content;
    transition: color 180ms ease;
  }

  .card:hover .read {
    color: var(--color-ink);
  }

  /* Compact rows on small screens: thumbnail left, text right */
  @media (max-width: 767px) {
    .card.compact {
      flex-direction: row;
      align-items: center;
      gap: 0.9rem;
    }

    .card.compact .img-container {
      flex: 0 0 104px;
      width: 104px;
      aspect-ratio: 1;
    }

    .card.compact .meta {
      padding-top: 0;
      min-width: 0;
    }

    .card.compact h3 {
      font-size: 15px;
    }

    .card.compact p {
      display: none;
    }
  }

  /* Featured post: image beside a larger title */
  @media (min-width: 768px) {
    .card.featured {
      flex-direction: row;
      align-items: center;
      gap: 2rem;
    }

    .card.featured .img-container {
      flex: 0 0 58%;
    }

    .card.featured .meta {
      padding-top: 0;
      gap: 0.5rem;
    }

    .card.featured .read {
      display: inline-block;
    }

    .card.featured h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      -webkit-line-clamp: 4;
      line-clamp: 4;
    }

    .card.featured p {
      font-size: 15px;
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }
  }

  @media (min-width: 1024px) {
    .card.featured h3 {
      font-size: 2.1rem;
    }
  }
</style>
