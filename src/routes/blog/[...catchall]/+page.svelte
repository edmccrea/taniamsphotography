<script lang="ts">
  import { fade } from "svelte/transition";

  import type { PageData } from "./$types";
  import TextBlock from "$lib/components/blog/TextBlock.svelte";
  import SubtitleBlock from "$lib/components/blog/SubtitleBlock.svelte";
  import ImageBlock from "$lib/components/blog/ImageBlock.svelte";

  export let data: PageData;

  const blogPost: App.BlogPost = data.blogPost;
</script>

<svelte:head>
  <meta property="og:image" content={blogPost.cardImage.responsiveImage.src} />
  <meta property="og:title" content={blogPost.excerpt} />
  <meta
    property="og:url"
    content="https://www.taniamccreasteele.com/blog/{blogPost.url}/"
  />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="post-wrapper" in:fade|global>
  <div class="title">
    <h1>{blogPost.title}</h1>
    <p>by Tania McCrea Steele &#183; {blogPost.publishDate}</p>
  </div>

  {#each blogPost.content as block}
    {#if Object.keys(block).includes("text")}
      <TextBlock text={block.text} />
    {/if}
    {#if Object.keys(block).includes("image")}
      <ImageBlock imageBlockData={block} />
    {/if}
    {#if Object.keys(block).includes("subtitle")}
      <SubtitleBlock subtitle={block.subtitle} />
    {/if}
  {/each}

  <a href="/blog">Read more posts like this...</a>
</div>

<style>
  .post-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  h1 {
    font-size: 2rem;
    color: var(--color-gray-700);
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 12px;
    color: var(--color-gray-500);
  }

  a {
    color: var(--color-gray-500);
    text-decoration: underline;
    cursor: pointer;
  }

  .post-wrapper :global(a) {
    color: var(--color-gray-500);
    text-decoration: underline;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .post-wrapper {
      margin-top: 3rem;
      max-width: 700px;
    }
    h1 {
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 14px;
    }
  }
</style>
