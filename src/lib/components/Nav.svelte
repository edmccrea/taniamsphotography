<script lang="ts">
  import { slide } from "svelte/transition";
  import Footer from "./Footer.svelte";
  let seasonsOpen = false;
</script>

<nav>
  <a class="logo" href="/">Tania</a>

  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li class="seasons-dropdown" on:click={() => (seasonsOpen = !seasonsOpen)}>
      Seasons
    </li>
    {#if seasonsOpen}
      <ul class="seasons-list" transition:slide|local>
        <li>
          <a href="/seasons/spring">Spring</a>
        </li>
        <li>
          <a href="/seasons/summer">Summer</a>
        </li>
        <li>
          <a href="/seasons/autumn">Autumn</a>
        </li>
        <li>
          <a href="/seasons/winter">Winter</a>
        </li>
      </ul>
    {/if}
    <li>
      <a href="/blog">Blog</a>
    </li>
    <li>
      <a href="/shop">Shop</a>
    </li>
    <li>
      <a href="/contact">Contact</a>
    </li>
  </ul>

  <Footer />
</nav>

<style>
  nav {
    height: 100%;
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }

  .logo {
    margin: 56px 0 40px;
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--color-gray-700);
  }

  li {
    margin-bottom: 22px;
    font-size: 14px;
    color: var(--color-gray-600);
  }

  .seasons-dropdown {
    cursor: pointer;
  }

  .seasons-list {
    padding-left: 12px;
  }

  nav :global(footer) {
    margin-top: auto;
    padding-bottom: 74px;
  }
</style>
