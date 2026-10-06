<script lang="ts">
  import { onMount } from 'svelte';
  import FramingExamples from '#lib/components/FramingExamples.svelte';
  import { SHOP_HERO_IMAGE, gbp, lowestPrice, priceRows, printRatios } from '#lib/prices.js';

  let selectedKey = $state(printRatios[1].key);
  let selected = $derived(printRatios.find(r => r.key === selectedKey) ?? printRatios[0]);
  let rows = $derived(priceRows(selected));

  onMount(() => {
    const ratio = new URL(window.location.href).searchParams.get('ratio');
    const key = ratio?.split(' ')[0];
    if (key && printRatios.some(r => r.key === key)) selectedKey = key;
  });
</script>

<svelte:head>
  <title>Prints | Tania McCrea Steele Photography</title>
  <meta
    name="description"
    content="Fine art photography prints by Tania McCrea Steele, printed by Loxley Colour. Stand-alone or framed, from £4.99."
  />
</svelte:head>

<div class="prints">
  <section class="hero">
    <div class="hero-copy">
      <h1>Bring a little of the landscape home.</h1>
      <p class="lead">
        Every photograph on this site is available as a stand-alone print or professionally framed,
        produced by
        <a href="https://www.loxleycolour.com/" target="_blank" rel="noopener">Loxley Colour</a>.
        Prices start from {gbp(lowestPrice)}.
      </p>
      <div class="actions">
        <a href="#prices" class="button">See prices</a>
        <a href="/gallery" class="button secondary">Choose a photograph</a>
      </div>
      <p class="thanks">
        Thank you for supporting my photography. Every print helps fund the time and equipment to
        keep capturing these moments.
      </p>
    </div>
    <figure class="hero-image">
      <img
        src={SHOP_HERO_IMAGE}
        alt="A framed print standing on a shelf beside two ceramic vases"
        width="800"
        height="600"
        fetchpriority="high"
      />
    </figure>
  </section>

  <section class="details" aria-label="What to expect">
    <div>
      <span class="num">01</span>
      <h3>Choose a photograph</h3>
      <p>
        Open any image in the gallery and use <em>Order a print</em>. It tells you the closest print
        ratio.
      </p>
    </div>
    <div>
      <span class="num">02</span>
      <h3>Pick a size</h3>
      <p>
        Stand-alone prints come with a small white border, ready to mount and frame however you
        like.
      </p>
    </div>
    <div>
      <span class="num">03</span>
      <h3>I'll confirm by email</h3>
      <p>Availability, shipping and payment details. Payment is by PayPal or bank transfer.</p>
    </div>
  </section>

  <FramingExamples />

  <section class="pricing" id="prices" aria-labelledby="prices-heading">
    <div class="pricing-heading">
      <h2 id="prices-heading">Choose the shape, then the size</h2>
      <p class="note">
        Sizes in inches with centimetre equivalents. Framed prices include the frame.
      </p>
    </div>

    <div class="tabs" role="tablist" aria-label="Print ratio">
      {#each printRatios as ratio (ratio.key)}
        <button
          role="tab"
          id="tab-{ratio.key.replace(':', '-')}"
          aria-selected={selectedKey === ratio.key}
          aria-controls="panel-prices"
          class="tab"
          class:active={selectedKey === ratio.key}
          onclick={() => (selectedKey = ratio.key)}
        >
          <span class="shape" style="aspect-ratio: {ratio.ratio[0]} / {ratio.ratio[1]}"></span>
          <span class="tab-label">{ratio.label}</span>
        </button>
      {/each}
    </div>

    <div
      class="price-table"
      role="tabpanel"
      id="panel-prices"
      aria-labelledby="tab-{selectedKey.replace(':', '-')}"
    >
      <div class="row head">
        <span>Size</span>
        <span>Print</span>
        <span>Framed</span>
      </div>
      {#each rows as row (row.sizeIn)}
        <div class="row">
          <span class="size">
            <strong>{row.sizeIn}<span class="unit"> in</span></strong>
            <small>{row.sizeCm} cm</small>
          </span>
          <span class="price">{row.print === null ? '—' : gbp(row.print)}</span>
          <span class="price">{row.framed === null ? '—' : gbp(row.framed)}</span>
        </div>
      {/each}
    </div>

    <p class="footnote">
      {#if selectedKey === '1:1'}
        Square prints suit the detail and wildlife work especially well.
      {:else}
        Not sure which shape? Open a photograph and <em>Order a print</em> will tell you.
      {/if}
    </p>
  </section>

  <section class="order">
    <h2>Ready to order?</h2>
    <p>
      Tell me which photograph, which size, and whether you'd like it framed. I'll reply with
      availability, shipping cost and payment details.
    </p>
    <a class="button" href="/contact?print=">Make an enquiry</a>
  </section>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .prints {
    width: 100%;
    max-width: 1040px;
    padding: 0.5rem 0 2rem;
  }

  /* Hero */
  .hero {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  h1 {
    font-weight: 700;
    font-size: 2.1rem;
    line-height: 1.15;
    color: var(--color-ink);
    letter-spacing: -0.01em;
    margin-bottom: 1rem;
  }

  .lead {
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-gray-600);
    margin-bottom: 1.5rem;
  }

  .lead a {
    color: var(--color-accent-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .thanks {
    margin-top: 1.5rem;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-gray-500);
  }

  .hero-image {
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--color-gray-200);
  }

  .hero-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .button {
    display: inline-block;
    padding: 0.65rem 1.2rem;
    border-radius: 999px;
    font-size: 14px;
    background: var(--color-accent);
    color: #fff;
    border: 1px solid var(--color-accent);
    transition:
      background 180ms ease,
      border-color 180ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
    border-color: var(--color-accent-strong);
  }

  .button.secondary {
    background: transparent;
    color: var(--color-accent-strong);
  }

  .button.secondary:hover {
    background: var(--color-accent-soft);
  }

  /* Steps */
  .details {
    display: grid;
    gap: 1.5rem;
    margin-top: 3.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--color-gray-200);
  }

  .details .num {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  .details h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: var(--color-ink);
    margin-bottom: 0.35rem;
  }

  .details p {
    font-size: 14px;
    line-height: 1.55;
    color: var(--color-gray-600);
  }

  em {
    font-style: normal;
    font-weight: 500;
    color: var(--color-accent-strong);
  }

  /* Pricing */
  .pricing {
    margin-top: 1rem;
    scroll-margin-top: 2rem;
  }

  .pricing-heading {
    margin-bottom: 1.5rem;
  }

  .pricing h2,
  .order h2 {
    font-weight: 600;
    font-size: 1.6rem;
    color: var(--color-ink);
  }

  .note {
    margin-top: 0.4rem;
    font-size: 13px;
    color: var(--color-gray-500);
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 0.25rem;
    margin-bottom: 1rem;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .tab {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.9rem 0.55rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--color-gray-200);
    background: #fff;
    color: var(--color-gray-600);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      color 180ms ease;
  }

  .tab:hover {
    border-color: var(--color-gray-400);
    color: var(--color-ink);
  }

  .tab.active {
    border-color: var(--color-accent);
    background: var(--color-accent-soft);
    color: var(--color-accent-strong);
  }

  .shape {
    display: inline-block;
    height: 14px;
    border: 1.5px solid currentColor;
    border-radius: 2px;
    opacity: 0.8;
  }

  .price-table {
    background: #fff;
    border: 1px solid var(--color-gray-200);
    border-radius: 10px;
    overflow: hidden;
  }

  .row {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    align-items: center;
    padding: 0.85rem 1rem;
    border-top: 1px solid var(--color-gray-100);
    font-size: 14px;
    transition: background 150ms ease;
  }

  .row:not(.head):hover {
    background: var(--color-paper);
  }

  .row.head {
    border-top: none;
    padding: 0.7rem 1rem;
    font-size: 12px;
    color: var(--color-gray-500);
    background: var(--color-gray-50);
  }

  .row.head span:not(:first-child),
  .price {
    text-align: right;
  }

  .size {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .size strong {
    font-weight: 500;
    color: var(--color-ink);
  }

  .unit {
    font-weight: 400;
    color: var(--color-gray-500);
  }

  .size small {
    font-size: 12px;
    color: var(--color-gray-500);
  }

  .price {
    font-variant-numeric: tabular-nums;
    color: var(--color-ink);
  }

  .footnote {
    margin-top: 0.9rem;
    font-size: 13px;
    color: var(--color-gray-500);
  }

  /* Order */
  .order {
    margin-top: 4rem;
    padding: 2.5rem 1.5rem;
    border-radius: 12px;
    background: var(--color-accent-soft);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .order p {
    font-size: 14px;
    line-height: 1.55;
    color: var(--color-gray-600);
    max-width: 520px;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    .hero {
      flex-direction: row;
      align-items: center;
      gap: 3rem;
    }

    .hero-copy {
      flex: 1 1 52%;
    }

    .hero-image {
      flex: 1 1 48%;
    }

    h1 {
      font-size: 2.6rem;
    }

    .details {
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }

    .row {
      grid-template-columns: 1fr 150px 150px;
      padding: 0.95rem 1.5rem;
    }

    .row.head {
      padding: 0.75rem 1.5rem;
    }

    .size {
      flex-direction: row;
      align-items: baseline;
      gap: 0.75rem;
    }

    .order {
      padding: 3rem 2rem;
    }
  }

  @media (min-width: 1024px) {
    .prints {
      padding-top: 3rem;
    }
  }
</style>
