<script lang="ts">
  import CustomImage from '$lib/components/CustomImage.svelte';

  let { data } = $props();

  let collections = $derived(data.allGalleryCollections);
</script>

<div class="collections-wrapper">
  <h1>Gallery.</h1>

  <div class="grid">
    {#each collections as collection}
      <a href={`/gallery/${collection.url}`} class="collection-card">
        <div class="image-container">
          {#if collection.images && collection.images.length > 0}
            <CustomImage data={collection.images[0].responsiveImage} />
          {/if}
          <div class="overlay">
            <h2>{collection.title}</h2>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .collections-wrapper {
    width: 100%;
    margin-top: 3rem;
  }

  h1 {
    font-size: 2rem;
    color: var(--color-gray-700);
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .collection-card {
    display: block;
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    cursor: pointer;
  }

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }

  .collection-card:hover .overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    padding: 1rem;
  }
</style>
