<script lang="ts">
  import type { Image } from '../../types';

  export let data: Image['responsiveImage'];
  let className: string = '';
  export { className as class };

  let loaded = false;
</script>

<div class="relative overflow-hidden w-full h-full {className}">
  <img
    src={data.base64}
    alt={data.alt || ''}
    class="absolute inset-0 w-full h-full object-cover blur-lg scale-110 transition-opacity duration-700 ease-in-out"
    class:opacity-0={loaded}
  />

  <img
    {...data}
    on:load={() => (loaded = true)}
    class="relative w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0"
    class:opacity-100={loaded}
    alt={data.alt || ''}
  />
</div>
