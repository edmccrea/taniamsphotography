<script lang="ts">
  import type { PageData } from './$types';
  import TextBlock from '$lib/components/blog/TextBlock.svelte';
  import SubtitleBlock from '$lib/components/blog/SubtitleBlock.svelte';
  import ImageBlock from '$lib/components/blog/ImageBlock.svelte';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;

  $: blogPost = data.blogPost;

  function handleBlogCardClick() {
    invalidateAll();
  }
</script>

<svelte:head>
  <meta property="og:image" content={blogPost.cardImage.responsiveImage.src} />
  <meta property="og:title" content={blogPost.excerpt} />
  <meta property="og:url" content="https://www.taniamccreasteele.com/blog/{blogPost.url}/" />
  <meta property="og:type" content="website" />
</svelte:head>

{#key blogPost.url}
  <div class="post-wrapper">
    <div class="title">
      <h1>{blogPost.title}</h1>
      <p>by Tania McCrea Steele &#183; {blogPost.publishDate}</p>
    </div>

    <div class="content">
      {#each blogPost.content as block}
        {#if Object.keys(block).includes('text')}
          <TextBlock text={block.text} />
        {/if}
        {#if Object.keys(block).includes('image')}
          <ImageBlock imageBlockData={block} />
        {/if}
        {#if Object.keys(block).includes('subtitle')}
          <SubtitleBlock subtitle={block.subtitle} />
        {/if}
      {/each}
    </div>

    <div class="">
      <h3>Enjoyed this? You might also like to have a look at these</h3>
      <div class="cards">
        {#each data.allBlogPosts as post}
          <BlogCard cardData={post} on:click={handleBlogCardClick} />
        {/each}
      </div>
    </div>
  </div>
{/key}

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

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    font-size: 12px;
    color: var(--color-gray-500);
  }

  .post-wrapper :global(a) {
    color: var(--color-gray-500);
    text-decoration: underline;
    cursor: pointer;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-gray-700);
    margin: 2rem 0 1rem;
    line-height: 1.2;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem 1rem;
    width: 100%;
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
