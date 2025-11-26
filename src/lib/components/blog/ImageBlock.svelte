<script lang="ts">
  import CustomImage from '$lib/components/CustomImage.svelte';
  export let imageBlockData: any;
</script>

<div class="image-block">
  <div class="image-item">
    <CustomImage data={imageBlockData.image.responsiveImage} />
    </div>
  {#if imageBlockData.caption}
    <p>{imageBlockData.caption}</p>
  {/if}
</div>

<style>
  .image-item :global(div) {
    border-radius: 3px;
  }

  p {
    margin-top: 0.5rem;
    font-size: 14px;
    text-align: center;
    color: var(--color-gray-600);
  }
</style>
