<script lang="ts">
  import { page } from '$app/state';
  import Footer from './Footer.svelte';

  function isActive(href: string): boolean {
    if (href === '/') return page.url.pathname === '/';
    return page.url.pathname.startsWith(href);
  }
</script>

<nav aria-label="Main">
  <a class="logo" href="/">Tania <br /> McCrea Steele <br /> Photography</a>
  <p class="strap">Landscape &amp; wildlife<br />Bradford on Avon, Wiltshire</p>

  <ul>
    <li><a href="/" class:active={isActive('/')}>Home</a></li>
    <li><a href="/about" class:active={isActive('/about')}>About</a></li>
    <li><a href="/gallery" class:active={isActive('/gallery')}>Gallery</a></li>
    <li><a href="/shop" class:active={isActive('/shop')}>Prints</a></li>
    <li><a href="/blog" class:active={isActive('/blog')}>Blog</a></li>
    <li><a href="/contact" class:active={isActive('/contact')}>Contact</a></li>
  </ul>

  <Footer />
</nav>

<style>
  nav {
    height: 100%;
    width: 220px;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
  }

  .logo {
    display: block;
    margin: 48px 0 12px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--color-ink);
    line-height: 0.95;
    width: fit-content;
  }

  .strap {
    font-size: 12px;
    line-height: 1.45;
    color: var(--color-gray-500);
    margin-bottom: 36px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  li {
    width: fit-content;
  }

  ul a {
    position: relative;
    display: block;
    font-size: 15px;
    line-height: 1.3;
    color: var(--color-gray-500);
    transition:
      color 180ms ease,
      transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  ul a:hover {
    color: var(--color-ink);
    transform: translateX(3px);
  }

  ul a.active {
    color: var(--color-ink);
    font-weight: 500;
  }

  ul a.active:hover {
    transform: none;
  }

  ul a::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 50%;
    width: 2px;
    height: 0;
    border-radius: 2px;
    background: var(--color-accent);
    transform: translateY(-50%);
    transition: height 220ms ease;
  }

  ul a.active::before {
    height: 14px;
  }

  nav :global(footer) {
    margin-top: auto;

    padding-bottom: 48px;
  }
</style>
