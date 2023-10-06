<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import { Image } from "@datocms/svelte";

  export let data: PageData;
  const about = data.about;

  function handleClick() {
    goto("/contact");
  }
</script>

<div class="about-container">
  <div class="about-wrapper" in:fade>
    <div class="image-wrapper">
      <Image data={about.profileImage.responsiveImage} />
    </div>

    <div class="about-content">
      <h1>{about.pageTitle}</h1>

      <content>
        {@html about.aboutText}
      </content>

      <button aria-label="contact" on:click={handleClick}>
        Get in touch
      </button>
    </div>
  </div>
</div>

<style>
  .about-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--color-gray-700);
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

  content :global(a) {
    color: var(--color-gray-500);
    text-decoration: underline;
    cursor: pointer;
  }

  .image-wrapper :global(div) {
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-gray-600);
    color: var(--color-gray-600);
    transition: all ease 0.2s;
    border-radius: 5px;
    font-size: 16px;
  }

  button:hover {
    background-color: var(--color-gray-100);
  }

  @media (min-width: 768px) {
    .about-wrapper {
      flex-direction: row;
    }

    .about-content {
      width: 40%;
    }

    .image-wrapper {
      width: 30%;
    }
  }
</style>
