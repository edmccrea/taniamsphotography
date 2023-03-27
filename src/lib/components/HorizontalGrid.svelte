<script lang="ts">
  export let images: App.Image[];
</script>

<div class="container">
  <ul class="image-gallery">
    {#each images as image}
      <li>
        <img src={image.url} alt="" />
      </li>
    {/each}
  </ul>
</div>

<style>
  .image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .image-gallery > li {
    height: 300px;
    cursor: pointer;
    position: relative;
    flex: 1 1 auto;
  }

  .image-gallery li img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 5px;
  }

  .image-gallery::after {
    content: "";
    flex-grow: 999;
  }
</style>
