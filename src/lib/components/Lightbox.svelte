<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { Dialog } from 'bits-ui';
  import { X, ArrowRight, ArrowLeft } from 'lucide-svelte';
  import type { Image } from '#lib/types.js';
  import { printEnquiryUrl } from '#lib/format.js';

  let {
    images = [],
    open = false,
    currentImageIndex = 0,
    context = '',
    onclose,
  }: {
    images?: Image[];
    open?: boolean;
    currentImageIndex?: number;
    context?: string;
    onclose?: () => void;
  } = $props();

  let internalIndex = $state(0);

  $effect(() => {
    if (open) internalIndex = currentImageIndex;
  });

  let currentImage = $derived(images[internalIndex] ?? null);
  let enquiryHref = $derived(
    currentImage
      ? printEnquiryUrl(context, internalIndex, images.length, currentImage.responsiveImage)
      : '/contact',
  );

  function step(delta: number) {
    if (!images.length) return;
    internalIndex = (internalIndex + delta + images.length) % images.length;
  }

  $effect(() => {
    if (!open || images.length < 2) return;
    for (const offset of [1, -1]) {
      const neighbour = images[(internalIndex + offset + images.length) % images.length];
      if (!neighbour) continue;
      const el = document.createElement('img');
      el.sizes = '100vw';
      el.srcset = neighbour.responsiveImage.srcSet;
      el.src = neighbour.responsiveImage.src;
    }
  });

  function onkeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
  }

  let touchStartX = 0;
  function ontouchstart(event: TouchEvent) {
    touchStartX = event.changedTouches[0].clientX;
  }
  function ontouchend(event: TouchEvent) {
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onclose?.();
  }
</script>

<svelte:window {onkeydown} />

<Dialog.Root {open} onOpenChange={handleOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay class="lb-overlay" />
    <Dialog.Content class="lb-content">
      <div class="lb-top">
        <div class="lb-meta">
          {#if context}
            <span class="lb-context">{context}</span>
          {/if}
          <span class="lb-counter">{internalIndex + 1} / {images.length}</span>
        </div>
        <Dialog.Close class="lb-icon-btn" aria-label="Close">
          <X class="lb-icon" />
        </Dialog.Close>
      </div>

      <div class="lb-stage" role="group" aria-label="Photograph" {ontouchstart} {ontouchend}>
        {#if currentImage}
          {#key internalIndex}
            <CustomImage
              data={currentImage.responsiveImage}
              loading="eager"
              fetchpriority="high"
              sizes="100vw"
              class="lb-image"
            />
          {/key}
        {/if}

        {#if images.length > 1}
          <button class="lb-arrow lb-prev" aria-label="Previous image" onclick={() => step(-1)}>
            <ArrowLeft class="lb-icon" />
          </button>
          <button class="lb-arrow lb-next" aria-label="Next image" onclick={() => step(1)}>
            <ArrowRight class="lb-icon" />
          </button>
        {/if}
      </div>

      <div class="lb-bottom">
        <a class="lb-cta" href={enquiryHref} onclick={() => onclose?.()}>Order a print</a>
        <span class="lb-hint">Arrow keys or swipe to browse</span>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.lb-overlay) {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(18, 19, 17, 0.96);
    animation: lb-fade 220ms ease-out both;
  }

  :global(.lb-content) {
    position: fixed;
    inset: 0;
    z-index: 51;
    display: flex;
    flex-direction: column;
    outline: none;
    color: rgba(255, 255, 255, 0.85);
    animation: lb-fade 260ms ease-out both;
  }

  :global(.lb-content[data-state='closed']),
  :global(.lb-overlay[data-state='closed']) {
    animation: lb-fade 180ms ease-in reverse both;
  }

  @keyframes lb-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lb-top,
  .lb-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    flex: 0 0 auto;
  }

  .lb-meta {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    min-width: 0;
  }

  .lb-context {
    font-family: 'Playfair Display', serif;
    font-size: 1.125rem;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lb-counter,
  .lb-hint {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.55);
    font-variant-numeric: tabular-nums;
  }

  .lb-hint {
    display: none;
  }

  :global(.lb-icon-btn),
  .lb-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.06);
    transition:
      background 180ms ease,
      color 180ms ease;
  }

  :global(.lb-icon-btn:hover),
  .lb-arrow:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }

  :global(.lb-icon) {
    width: 20px;
    height: 20px;
  }

  .lb-stage {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    padding: 0 1rem;
    touch-action: pan-y;
  }

  :global(.lb-image) {
    height: 100%;
  }

  :global(.lb-image img) {
    object-fit: contain !important;
  }

  .lb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(18, 19, 17, 0.55);
    backdrop-filter: blur(6px);
  }

  .lb-prev {
    left: 1.25rem;
  }

  .lb-next {
    right: 1.25rem;
  }

  .lb-cta {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    letter-spacing: 0.02em;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    transition:
      background 180ms ease,
      border-color 180ms ease;
  }

  .lb-cta:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.6);
  }

  @media (min-width: 768px) {
    .lb-top,
    .lb-bottom {
      padding: 1.25rem 2rem;
    }

    .lb-stage {
      padding: 0 5rem;
    }

    .lb-prev {
      left: 2rem;
    }

    .lb-next {
      right: 2rem;
    }

    .lb-hint {
      display: inline;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.lb-overlay),
    :global(.lb-content) {
      animation: none;
    }
  }
</style>
