<script lang="ts">
  import TextBlock from '#lib/components/blog/TextBlock.svelte';
  import SubtitleBlock from '#lib/components/blog/SubtitleBlock.svelte';
  import ImageBlock from '#lib/components/blog/ImageBlock.svelte';
  import BlogCard from '#lib/components/blog/BlogCard.svelte';
  import { getBlogPost } from '#lib/cms.remote.js';
  import { distinctExcerpt, formatDate } from '#lib/format.js';

  let { params } = $props();

  const data = $derived(await getBlogPost(params.blogTitle));
  const post = $derived(data.post);
  const lead = $derived(distinctExcerpt(post.excerpt, post.title));
</script>

<svelte:head>
  <title>{post.title} | Tania McCrea Steele Photography</title>
  <meta name="description" content={lead ?? post.title} />
  <meta property="og:image" content={post.cardImage.responsiveImage.src} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={lead ?? post.title} />
  <meta property="og:url" content="https://www.taniamccreasteele.com/blog/{post.url}" />
  <meta property="og:type" content="article" />
</svelte:head>

{#key post.url}
  <article class="post-wrapper">
    <header class="post-header">
      <a class="back" href="/blog">← Blog</a>
      <h1>{post.title}</h1>
      {#if lead}
        <p class="lead">{lead}</p>
      {/if}
      <p class="byline">
        Tania McCrea Steele · <time datetime={post.publishDate}>{formatDate(post.publishDate)}</time
        >
      </p>
    </header>

    <div class="content">
      {#each post.content as block (block.id)}
        {#if block.__typename === 'TextBlockRecord'}
          <TextBlock text={block.text} />
        {:else if block.__typename === 'ImageBlockRecord'}
          <ImageBlock image={block.image} caption={block.caption} />
        {:else if block.__typename === 'SubtitleBlockRecord'}
          <SubtitleBlock subtitle={block.subtitle} />
        {/if}
      {/each}
    </div>

    {#if data.related.length}
      <aside class="related">
        <h2>You might also like</h2>
        <div class="cards">
          {#each data.related as related (related.id)}
            <BlogCard cardData={related} />
          {/each}
        </div>
      </aside>
    {/if}
  </article>
{/key}

<style>
  .post-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .post-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-gray-200);
  }

  .back {
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--color-gray-500);
    width: fit-content;
    transition: color 180ms ease;
  }

  .back:hover {
    color: var(--color-accent-strong);
  }

  h1 {
    font-size: 2.25rem;
    line-height: 1.15;
    color: var(--color-ink);
    letter-spacing: -0.01em;
  }

  .lead {
    font-size: 17px;
    line-height: 1.5;
    color: var(--color-gray-600);
  }

  .byline {
    font-size: 13px;
    color: var(--color-gray-500);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .content :global(a) {
    color: var(--color-accent-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .related {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-gray-200);
  }

  .related h2 {
    font-size: 1.5rem;
    color: var(--color-ink);
    margin-bottom: 1.25rem;
    line-height: 1.2;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem 1rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .post-wrapper {
      max-width: 700px;
    }

    h1 {
      font-size: 2.75rem;
    }
  }

  @media (min-width: 1024px) {
    .post-wrapper {
      margin-top: 3rem;
    }
  }
</style>
