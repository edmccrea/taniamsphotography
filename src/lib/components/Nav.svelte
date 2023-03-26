<script lang="ts">
  import { slide } from "svelte/transition";
  import Footer from "./Footer.svelte";
  let seasonsOpen = false;

  export let customSectionTitle: string;
  export let customPages: string[];
</script>

<nav>
  <a class="logo" href="/">Tania <br /> McCrea Steele <br /> Photography</a>

  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li
      class="seasons-dropdown"
      on:click={() => (seasonsOpen = !seasonsOpen)}
      on:keyup={() => (seasonsOpen = !seasonsOpen)}
    >
      {customSectionTitle}
      <svg
        class:open={seasonsOpen}
        class="seasons-arrow"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 9L12 16L5 9"
          stroke="#4b5563"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </li>
    {#if seasonsOpen}
      <ul class="seasons-list" transition:slide|local>
        {#each customPages as page}
          <li>
            <a href={page.toLowerCase()}>{page}</a>
          </li>
        {/each}
      </ul>
    {/if}
    <li>
      <a href="/blog">Blog</a>
    </li>
    <li>
      <a
        href="https://www.etsy.com/uk/shop/TaniaMcCreaSteele?fbclid=IwAR28D03u4blB0DNj-Kr15L6__u1AtRgMku1Y_3Lbrfv4KilN0joIljymy44"
        target="_blank">Shop</a
      >
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
    font-size: 14px;
    color: var(--color-gray-600);
    width: fit-content;
    display: flex;
    align-items: center;
  }

  a {
    margin-bottom: 22px;
  }

  ul a:after {
    transition: all ease-in-out 300ms;
    background: none repeat scroll 0 0 var(--color-gray-600);
    content: "";
    display: block;
    height: 1px;
    width: 0;
  }

  a:hover:after {
    width: 100%;
  }

  .seasons-arrow {
    margin-left: 8px;
    transition: all ease-in-out 200ms;
  }

  .seasons-arrow.open {
    transform: rotate(180deg);
  }

  .seasons-dropdown {
    cursor: pointer;
    margin-bottom: 22px;
  }

  .seasons-list {
    padding-left: 12px;
  }

  nav :global(footer) {
    margin-top: auto;
    padding-bottom: 74px;
  }
</style>
