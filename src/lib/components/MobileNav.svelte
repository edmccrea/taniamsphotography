<script lang="ts">
  import { navigating } from '$app/stores';
  import { fade } from 'svelte/transition';

  let showNav = false;

  $: $navigating, (showNav = false);
</script>

<svelte:head>
  {#if showNav}
    <style>
      body {
        overflow: hidden !important;
      }
    </style>
  {/if}
</svelte:head>

{#if showNav}
  <div class="nav-wrapper">
    <button aria-label="close" class="close-nav" in:fade|global onclick={() => (showNav = false)}
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="#4b5563"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg></button
    >
    <nav in:fade|global>
      <ul class="nav-items">
        <li>
          <a aria-label="home" href="/">Home</a>
        </li>
        <li>
          <a aria-label="about" href="/about">About</a>
        </li>
        <li>
          <a aria-label="gallery" href="/gallery">Gallery</a>
        </li>
        <li>
          <a aria-label="shop" href="/shop">Shop</a>
        </li>
        <li>
          <a aria-label="blog" href="/blog">Blog</a>
        </li>
        <li>
          <a aria-label="contact" href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
{:else}
  <header>
    <a href="/" class="logo">Tania<br /> McCrea Steele</a>

    <button aria-label="menu" onclick={() => (showNav = !showNav)}
      ><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20M4 12H12M4 18H20"
          stroke="#374151"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg></button
    >
  </header>
{/if}

<style>
  header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-family: 'Playfair Display', serif;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-gray-700);
    padding-left: 1rem;
    margin-bottom: 0;
  }

  button {
    padding-right: 1rem;
  }

  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90;
    text-align: center;
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

  .close-nav {
    position: absolute;
    top: 1.5rem;
    right: 0.5rem;
  }
</style>
