<script lang="ts">
  import type { ResponsiveImage } from '#lib/types.js';

  let {
    data,
    class: className = '',
    loading = 'lazy',
    fetchpriority = 'auto',
    sizes,
  }: {
    data: ResponsiveImage;
    class?: string;
    loading?: 'lazy' | 'eager';
    fetchpriority?: 'high' | 'low' | 'auto';
    sizes?: string;
  } = $props();

  let loaded = $state(false);
</script>

<div class="relative overflow-hidden w-full h-full {className}">
  {#if data.base64}
    <img
      src={data.base64}
      alt=""
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover blur-lg scale-110 transition-opacity duration-700 ease-in-out"
      class:opacity-0={loaded}
    />
  {/if}

  <img
    src={data.src}
    srcset={data.srcSet}
    sizes={sizes ?? data.sizes}
    width={data.width}
    height={data.height}
    alt={data.alt ?? ''}
    {loading}
    {fetchpriority}
    decoding="async"
    onload={() => (loaded = true)}
    class="relative w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0"
    class:opacity-100={loaded}
  />
</div>
