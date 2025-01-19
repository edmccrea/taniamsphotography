<script lang="ts">
  import { goto } from '$app/navigation';
  import type { BlogPost } from '../../../types';
  import { createEventDispatcher } from 'svelte';

  export let cardData: BlogPost;

  const dispatch = createEventDispatcher<{ click: null }>();

  async function goToPost() {
    await goto(`/blog/${cardData.url}`);
    dispatch('click');
  }
</script>

<button class="card" on:click={goToPost}>
  <div class="img-container">
    <img src={cardData.cardImage.responsiveImage.src} alt="" />
  </div>
  <h3>{cardData.title}</h3>
  <p>{cardData.publishDate}</p>
</button>

<style>
  .card {
    display: flex;
    flex-direction: column;
    text-align: left;
    cursor: pointer;
    width: 100%;
    max-height: 350px;
    min-height: 350px;
    color: var(--color-gray-700);
  }

  .img-container {
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 70%;
    border-radius: 4px;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all ease-in-out 200ms;
  }

  .card:hover img {
    transform: scale(1.05);
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    padding: 0.5rem 0 0.25rem;
    font-family: 'Poppins', sans-serif;
    line-height: 1.3;
  }

  p {
    font-size: 12px;
    color: var(--color-gray-500);
  }
</style>
