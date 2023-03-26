<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;
  const about = data.about;
</script>

<div class="about-wrapper" in:fade>
  <div class="about-content">
    <h1>{about.pageTitle}</h1>

    <content>
      {@html about.aboutText}
    </content>
  </div>

  <div class="image-wrapper">
    <img src={about.profileImage.url} alt="" />
  </div>
</div>

<style>
  .about-wrapper {
    display: flex;
    gap: 20px;
    margin: 0 auto;
    width: 75%;
    margin-top: 3rem;
  }

  .about-content {
    width: 50%;
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  content {
    font-family: "Poppins", sans-serif;
    color: var(--color-gray-600);
    font-size: 14px;
  }

  content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.25;
  }

  .image-wrapper {
    width: 50%;
    margin-top: 3rem;
  }
  img {
    width: 100%;
    border-radius: 5px;
  }
</style>
