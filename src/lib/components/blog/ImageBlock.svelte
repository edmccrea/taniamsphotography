<script lang="ts">
  export let imageBlockData: any;
</script>

<div class="image-block">
  <img src={imageBlockData.image.responsiveImage.src} alt="" />
  {#if imageBlockData.caption}
    <p>{imageBlockData.caption}</p>
  {/if}
</div>

<style>
  img {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 14px;
    text-align: center;
    color: var(--color-gray-600);
  }
</style>
