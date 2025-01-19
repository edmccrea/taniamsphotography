<script lang="ts">
  import type { PageData } from './$types';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';

  export let data: PageData;
</script>

<div class="blog-wrapper">
  <h1>Blogs.</h1>
  <div class="cards">
    {#each data.allBlogPosts as post}
      <BlogCard cardData={post} />
    {/each}
  </div>
</div>

<style>
  .blog-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  h1 {
    font-size: 2rem;
    color: var(--color-gray-700);
    margin-bottom: 1rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .blog-wrapper {
      margin-top: 3rem;
    }
  }
</style>
