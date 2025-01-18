<script lang="ts">
  import { fade } from "svelte/transition";

  import type { PageData } from "./$types";
  import BlogCard from "$lib/components/blog/BlogCard.svelte";

  export let data: PageData;
</script>

<div class="blog-wrapper">
  <h1>Blogs</h1>
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .blog-wrapper {
      margin-top: 3rem;
    }

    .cards {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>
