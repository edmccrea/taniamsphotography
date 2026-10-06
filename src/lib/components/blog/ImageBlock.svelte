<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import type { Image } from '#lib/types.js';

  let { image, caption }: { image: Image; caption: string | null } = $props();
</script>

<div class="image-block">
  <div class="image-item">
    <CustomImage
      data={image.responsiveImage}
      sizes="(min-width: 768px) 700px, calc(100vw - 32px)"
    />
  </div>
  {#if caption}
    <p>{caption}</p>
  {/if}
</div>

<style>
  .image-item :global(div) {
    border-radius: 3px;
  }

  p {
    margin-top: 0.5rem;
    font-size: 14px;
    text-align: center;
    color: var(--color-gray-600);
  }
</style>
