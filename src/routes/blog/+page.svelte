<script lang="ts">
  import BlogCard from '#lib/components/blog/BlogCard.svelte';
  import { getBlogIndex } from '#lib/cms.remote.js';

  const posts = await getBlogIndex();
</script>

<svelte:head>
  <title>Blog | Tania McCrea Steele Photography</title>
  <meta
    name="description"
    content="Stories and notes from behind the lens by Tania McCrea Steele, landscape and wildlife photographer in Wiltshire."
  />
</svelte:head>

<div class="blog-wrapper">
  <div class="page-heading">
    <h1>Blog.</h1>
    <p>Notes from behind the lens: places, light, wildlife and the odd swan.</p>
  </div>
  <div class="cards">
    {#each posts as post, i (post.id)}
      <div class="cell" class:span={i === 0}>
        <BlogCard cardData={post} featured={i === 0} compact={i >= 4} />
      </div>
    {/each}
  </div>
</div>

<style>
  .blog-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .page-heading {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
    color: var(--color-ink);
    margin-bottom: 0.35rem;
  }

  .page-heading p {
    font-size: 14px;
    color: var(--color-gray-500);
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;
  }

  .cell.span {
    grid-column: 1 / -1;
  }

  .cell.span + .cell {
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 1.5rem;
    }

    .cell.span {
      padding-bottom: 2.5rem;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .cell.span + .cell {
      margin-top: 0;
    }
  }

  @media (min-width: 1024px) {
    .cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .blog-wrapper {
      margin-top: 3rem;
    }
  }
</style>
