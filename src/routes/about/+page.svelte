<script lang="ts">
  import CustomImage from '#lib/components/CustomImage.svelte';
  import Reveal from '#lib/components/Reveal.svelte';
  import { getAbout } from '#lib/cms.remote.js';

  const about = await getAbout();
</script>

<svelte:head>
  <title>About Tania McCrea Steele | Photographer in Bradford on Avon</title>
  <meta
    name="description"
    content="Learn more about Tania McCrea Steele, a passionate photographer capturing the beauty of Bradford on Avon and beyond."
  />
</svelte:head>

<div class="about-container">
  <div class="about-wrapper">
    <div class="image-wrapper">
      <Reveal>
        <CustomImage
          data={about.profileImage.responsiveImage}
          loading="eager"
          fetchpriority="high"
          sizes="(min-width: 768px) 400px, calc(100vw - 32px)"
        />
      </Reveal>
    </div>

    <div class="about-content">
      <Reveal delay={0.15}>
        <h1>{about.pageTitle}</h1>

        <div class="about-text">
          {@html about.aboutText}
        </div>

        <div class="actions">
          <a class="button" href="/contact">Get in touch</a>
          <a class="button secondary" href="/shop">Order a print</a>
        </div>
      </Reveal>
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
    gap: 1.5rem;
    width: 100%;
    max-width: 1040px;
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--color-ink);
  }

  .about-text {
    color: var(--color-gray-600);
    font-size: 15px;
    line-height: 1.6;
  }

  .about-text :global(p) {
    margin-bottom: 1rem;
  }

  .about-text :global(strong) {
    font-weight: 500;
    color: var(--color-ink);
  }

  .about-text :global(a) {
    color: var(--color-accent-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .image-wrapper :global(div) {
    border-radius: 6px;
    box-shadow: rgba(60, 64, 50, 0.18) 0px 10px 30px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .button {
    display: inline-block;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    font-size: 14px;
    background: var(--color-accent);
    color: #fff;
    border: 1px solid var(--color-accent);
    transition:
      background 180ms ease,
      border-color 180ms ease,
      color 180ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
    border-color: var(--color-accent-strong);
  }

  .button.secondary {
    background: transparent;
    color: var(--color-accent-strong);
  }

  .button.secondary:hover {
    background: var(--color-accent-soft);
  }

  @media (min-width: 768px) {
    .about-wrapper {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
    }

    .image-wrapper {
      flex: 0 0 38%;
    }

    .about-content {
      flex: 1 1 auto;
      max-width: 560px;
      padding-top: 0.5rem;
    }
  }
</style>
