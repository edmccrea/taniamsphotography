<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: pageType = data.pageType;
  $: galleryData = data.galleryCollection.gallery.find(
    (gallery) => gallery.title.toLowerCase() === pageType
  );
</script>

{#key pageType}
  <div class="gallery-wrapper" in:fade>
    <h1>{galleryData.title}</h1>
  </div>
{/key}
