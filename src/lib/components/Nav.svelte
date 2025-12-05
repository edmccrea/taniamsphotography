<script lang="ts">
  import Footer from './Footer.svelte';
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
    <li>
      <a href="/collections">Collections</a>
    </li>
    <li>
      <a href="/shop">Shop</a>
    </li>
    <li>
      <a href="/blog">Blog</a>
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
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--color-gray-700);
    line-height: 0.9;
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
    content: '';
    display: block;
    height: 1px;
    width: 0;
  }

  a:hover:after {
    width: 100%;
  }

  nav :global(footer) {
    margin-top: auto;
    padding-bottom: 74px;
  }
</style>
