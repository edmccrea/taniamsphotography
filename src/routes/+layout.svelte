<script lang="ts">
  import "../app.css";
  import Nav from "../lib/components/Nav.svelte";
</script>

<aside>
  <Nav />
</aside>

<main>
  <slot />
</main>

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
