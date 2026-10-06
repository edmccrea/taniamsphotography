<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import Footer from './Footer.svelte';

  let showNav = $state(false);
  let scrollY = $state(0);
  let scrolled = $derived(scrollY > 8);

  const links = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/gallery', 'Gallery'],
    ['/shop', 'Prints'],
    ['/blog', 'Blog'],
    ['/contact', 'Contact'],
  ] as const;

  function isActive(href: string): boolean {
    if (href === '/') return page.url.pathname === '/';
    return page.url.pathname.startsWith(href);
  }

  $effect(() => {
    page.url.pathname;
    showNav = false;
  });
</script>

<svelte:window bind:scrollY />

<svelte:head>
  {#if showNav}
    <style>
      body {
        overflow: hidden !important;
      }
    </style>
  {/if}
</svelte:head>

<header class:scrolled>
  <a href="/" class="logo">Tania<br /> McCrea Steele</a>

  <button aria-label="Open menu" aria-expanded={showNav} onclick={() => (showNav = true)}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6H20M4 12H12M4 18H20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</header>

{#if showNav}
  <div class="nav-wrapper" transition:fade={{ duration: 180 }}>
    <button aria-label="Close menu" class="close-nav" onclick={() => (showNav = false)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <nav aria-label="Main">
      <ul class="nav-items">
        {#each links as [href, label], i}
          <li style="--i: {i}">
            <a {href} class:active={isActive(href)}>{label}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="menu-footer">
      <Footer />
    </div>
  </div>
{/if}

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 40;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: color-mix(in srgb, var(--color-paper) 88%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 200ms ease;
  }

  header.scrolled {
    border-bottom-color: var(--color-gray-200);
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.1;
    color: var(--color-ink);
    padding-left: 1rem;
  }

  header button {
    padding: 0.75rem 1rem;
    color: var(--color-gray-700);
  }

  .nav-wrapper {
    position: fixed;
    inset: 0;
    background-color: var(--color-paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 90;
    text-align: center;
    padding: 2rem 1rem;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .nav-items li {
    animation: rise 320ms ease-out both;
    animation-delay: calc(var(--i) * 45ms);
  }

  .nav-items a {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    line-height: 1.2;
    color: var(--color-gray-500);
    display: inline-block;
    padding: 0.1em 0.2em;
    transition: color 180ms ease;
  }

  .nav-items a:hover,
  .nav-items a.active {
    color: var(--color-ink);
  }

  .close-nav {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    padding: 0.5rem;
    color: var(--color-gray-700);
  }

  .menu-footer {
    position: absolute;
    bottom: 2.5rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-items li {
      animation: none;
    }
  }

  @media (min-width: 1024px) {
    header,
    .nav-wrapper {
      display: none;
    }
  }
</style>
