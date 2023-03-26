<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import "../app.css";
  import Nav from "../lib/components/Nav.svelte";

  export let data: PageData;

  const customSectionTitle = data.galleryCollection.title;
  const customPages = data.galleryCollection.gallery.map(
    (gallery) => gallery.title
  );

  // let showTitle = true;
  // onMount(() => {
  //   setTimeout(() => {
  //     showTitle = false;
  //   }, 2000);
  // });
</script>

<!-- {#if showTitle}
  <h1>Tania McCrea Steele</h1>
{:else} -->
<aside>
  <Nav {customSectionTitle} {customPages} />
</aside>

<main>
  <slot />
</main>

<!-- {/if} -->
<style>
  @media (min-width: 768px) {
    :global(body) {
      min-height: 100vh;
      display: flex;
    }

    aside {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    main {
      margin-left: 343px;
      padding: 40px 40px 40px 0;
    }
  }
</style>
