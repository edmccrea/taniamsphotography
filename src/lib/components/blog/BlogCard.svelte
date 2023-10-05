<script lang="ts">
  import { goto } from "$app/navigation";

  export let cardData: any;

  function goToPost() {
    goto(`/blog/${cardData.url}`);
  }
</script>

<div class="card" on:click={goToPost} on:keyup={goToPost}>
  <div class="img-container">
    <img src={cardData.cardImage.responsiveImage.src} alt="" />
  </div>
  <h3>{cardData.title}</h3>
  <p>{cardData.publishDate}</p>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 325px;
    height: 350px;
    border-radius: 5px;
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
    transition: all ease-in-out 300ms;
  }

  .card:hover img {
    transform: scale(1.05);
  }

  h3 {
    font-size: 24px;
    font-weight: 500;
    padding: 0.5rem 0;
  }
  p {
    font-size: 14px;
  }
</style>
