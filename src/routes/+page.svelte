<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import { openLightbox } from '#lib/lightbox.svelte.js';
  import { getHomeGallery } from '#lib/cms.remote.js';

  const columns = await getHomeGallery();
  const allImages = columns.flat();
  const columnOffsets = columns.map((_, colIdx) =>
    columns.slice(0, colIdx).reduce((acc, col) => acc + col.length, 0),
  );
</script>

<svelte:head>
  <title>Tania McCrea Steele Photography | Bradford on Avon</title>
  <meta
    name="description"
    content="Professional landscape and wildlife photography by Tania McCrea Steele, based in Bradford on Avon, Wiltshire. View the gallery and shop prints."
  />
  <meta property="og:image" content="https://www.taniamccreasteele.com/og-image.jpg" />
  <meta property="og:title" content="Tania McCrea Steele Photography | Bradford on Avon" />
  <meta property="og:url" content="https://www.taniamccreasteele.com" />
  <meta property="og:type" content="website" />
</svelte:head>

<h1 class="sr-only">Tania McCrea Steele Photography - Bradford on Avon</h1>

<div class="flex flex-col gap-[10px] w-full md:flex-row">
  {#each columns as column, colIdx}
    <div class="column-wrapper flex flex-col gap-[10px] md:w-1/3" style="--i: {colIdx}">
      {#each column as image, i}
        <button
          class="w-full p-0 [&_div]:rounded-[5px] overflow-hidden [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-in-out hover:[&_img]:scale-105"
          onclick={() => openLightbox(allImages, columnOffsets[colIdx] + i, 'Featured')}
        >
          <CustomImage
            data={image.responsiveImage}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchpriority={i === 0 && colIdx === 0 ? 'high' : 'auto'}
            sizes="(min-width: 1024px) calc((100vw - 360px) / 3), (min-width: 768px) calc((100vw - 52px) / 3), calc(100vw - 32px)"
          />
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .column-wrapper {
    animation: rise 0.4s ease-out both;
    animation-delay: calc(var(--i) * 0.1s);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .column-wrapper {
      animation: none;
    }
  }
</style>
