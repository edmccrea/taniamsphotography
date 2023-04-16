<script lang="ts">
  import { goto } from "$app/navigation";

  export let cardData: any;

  function goToPost() {
    goto(`/blog/${cardData.url}`);
  }
</script>

<div class="card" on:click={goToPost} on:keyup={goToPost}>
  <img src={cardData.cardImage.responsiveImage.src} alt="" />
  <h3>{cardData.title}</h3>
  <p>{cardData.publishDate}</p>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all ease 300ms;
    width: 325px;
    height: 350px;
    border-radius: 5px;
  }

  .card:hover {
    transform: scale(1.01);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 70%;
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
