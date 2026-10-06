<script lang="ts">
  import { SHOP_HERO_IMAGE } from '#lib/prices.js';

  const examples = Array.from({ length: 15 }, (_, i) => ({
    src: `/images/shop/example_${i + 1}.jpeg`,
    alt: 'Framed print in a home setting',
  })).filter(example => example.src !== SHOP_HERO_IMAGE);

  let expanded = $state(false);
  const initial = 6;
  let visible = $derived(expanded ? examples : examples.slice(0, initial));
</script>

<section class="framing" aria-labelledby="framing-heading">
  <div class="heading-row">
    <h2 id="framing-heading">See them on a wall</h2>
    <p class="hint">Swipe to see more</p>
  </div>

  <ul class="gallery-grid" class:expanded>
    {#each visible as example, i (example.src)}
      <li class="gallery-item" class:feature={i === 0}>
        <img
          src={example.src}
          alt={example.alt}
          loading={i < 3 ? 'eager' : 'lazy'}
          decoding="async"
          width="800"
          height="600"
        />
      </li>
    {/each}
  </ul>

  {#if !expanded}
    <button class="more" onclick={() => (expanded = true)}>
      Show all {examples.length} examples
    </button>
  {/if}
</section>

<style>
  .framing {
    margin: 4rem 0;
  }

  .heading-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-weight: 600;
    font-size: 1.6rem;
    color: var(--color-ink);
  }

  .hint {
    font-size: 12px;
    color: var(--color-gray-500);
  }

  .gallery-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin: 0 -1rem;
    padding: 0 1rem 0.5rem;
  }

  .gallery-grid::-webkit-scrollbar {
    display: none;
  }

  .gallery-item {
    flex: 0 0 78%;
    scroll-snap-align: start;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    border: 1px solid var(--color-gray-200);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out;
  }

  .gallery-item img {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .more {
    display: none;
  }

  @media (min-width: 768px) {
    .hint {
      display: none;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
      gap: 1.25rem;
      overflow: visible;
      margin: 0;
      padding: 0;
    }

    .gallery-item {
      flex: none;
    }

    .gallery-item.feature {
      grid-column: span 2;
      grid-row: span 2;
    }

    .gallery-item.feature img {
      aspect-ratio: auto;
    }

    .gallery-item:hover {
      border-color: var(--color-gray-300);
    }

    .gallery-item:hover img {
      transform: scale(1.04);
    }

    .more {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.55rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--color-gray-300);
      font-size: 13px;
      color: var(--color-gray-700);
      transition:
        border-color 180ms ease,
        color 180ms ease,
        background 180ms ease;
    }

    .more:hover {
      border-color: var(--color-accent);
      color: var(--color-accent-strong);
      background: var(--color-accent-soft);
    }
  }
</style>
