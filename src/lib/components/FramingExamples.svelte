<script lang="ts">
  let examples = [];
  for (let i = 0; i < 15; i++) {
    examples.push({
      src: `/images/shop/example_${i + 1}.jpeg`,
      alt: 'Framed art print in a modern living room setting',
    });
  }
</script>

<div class="framing-examples-container">
  <h2>See Them in Your Home</h2>
  <div class="gallery-grid">
    {#each examples as example}
      <figure class="gallery-item">
        <div class="image-wrapper">
          <img src={example.src} alt={example.alt} loading="lazy" />
        </div>
      </figure>
    {/each}
  </div>
</div>

<style>
  .framing-examples-container {
    margin: 3rem 0;
  }

  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--color-gray-700);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .gallery-item {
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out;
  }

  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .image-wrapper {
    overflow: hidden;
  }

  .gallery-item img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.05);
  }
</style>
