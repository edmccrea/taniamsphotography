<script lang="ts">
  import { goto } from '$app/navigation';
  import FramingExamples from '$lib/components/FramingExamples.svelte';

  const printRatios = [
    {
      title: '4:3 Ratio',
      color: '🔲',
      printOnly: [
        { sizeIn: '6x4.5', sizeCm: '15.2 x 11.4', price: 9.99 },
        { sizeIn: '8x6', sizeCm: '20.3 x 15.2', price: 19.99 },
        { sizeIn: '12x9', sizeCm: '30.5 x 22.9', price: 21.99 },
        { sizeIn: '16x12', sizeCm: '40.6 x 30.5', price: 29.99 },
        { sizeIn: '20x15', sizeCm: '50.8 x 38.1', price: 34.99 },
        { sizeIn: '24x18', sizeCm: '61 x 45.7', price: 59.99 },
      ],
      framed: [
        { sizeIn: '16x12', sizeCm: '40.6 x 30.5', price: 99.99 },
        { sizeIn: '24x18', sizeCm: '61 x 45.7', price: 159.99 },
      ],
    },
    {
      title: '3:2 Ratio',
      color: '🟦',
      printOnly: [
        { sizeIn: '6x4', sizeCm: '15.2 x 10.2', price: 9.99 },
        { sizeIn: '7.5x5', sizeCm: '19.1 x 12.7', price: 11.99 },
        { sizeIn: '9x6', sizeCm: '22.9 x 15.2', price: 19.99 },
        { sizeIn: '12x8', sizeCm: '30.5 x 20.3', price: 21.99 },
        { sizeIn: '15x10', sizeCm: '38.1 x 25.4', price: 29.99 },
        { sizeIn: '18x12', sizeCm: '45.7 x 30.5', price: 34.99 },
        { sizeIn: '24x16', sizeCm: '61 x 40.6', price: 59.99 },
      ],
      framed: [
        { sizeIn: '15x10', sizeCm: '38.1 x 25.4', price: 99.99 },
        { sizeIn: '24x16', sizeCm: '61 x 40.6', price: 159.99 },
      ],
    },
    {
      title: '5:4 Ratio',
      color: '🟥',
      printOnly: [
        { sizeIn: '5x4', sizeCm: '12.7 x 10.2', price: 4.99 },
        { sizeIn: '10x8', sizeCm: '25.4 x 20.3', price: 24.99 },
        { sizeIn: '15x12', sizeCm: '38.1 x 30.5', price: 29.99 },
        { sizeIn: '20x16', sizeCm: '50.8 x 40.6', price: 54.99 },
      ],
      framed: [
        { sizeIn: '15x12', sizeCm: '38.1 x 30.5', price: 99.99 },
        { sizeIn: '20x16', sizeCm: '50.8 x 40.6', price: 154.99 },
      ],
    },
    {
      title: '5:7 Ratio',
      color: '🟨',
      printOnly: [
        { sizeIn: '7x5', sizeCm: '17.8 x 12.7', price: 11.99 },
        { sizeIn: '10.5x7.5', sizeCm: '26.7 x 19.1', price: 19.99 },
        { sizeIn: '14x10', sizeCm: '35.6 x 25.4', price: 21.99 },
        { sizeIn: '17.5x12.5', sizeCm: '44.5 x 31.8', price: 29.99 },
        { sizeIn: '21x15', sizeCm: '53.3 x 38.1', price: 34.99 },
      ],
      framed: [
        { sizeIn: '17.5x12.5', sizeCm: '44.5 x 31.8', price: 99.99 },
        { sizeIn: '28x20', sizeCm: '71.1 x 50.8', price: 159.99 },
      ],
    },
    {
      title: '1:1 Ratio (Square Prints)',
      color: '🟩',
      printOnly: [
        { sizeIn: '6x6', sizeCm: '15.2 x 15.2', price: 13.99 },
        { sizeIn: '8x8', sizeCm: '20.3 x 20.3', price: 22.99 },
        { sizeIn: '10x10', sizeCm: '25.4 x 25.4', price: 25.99 },
        { sizeIn: '12x12', sizeCm: '30.5 x 30.5', price: 27.99 },
        { sizeIn: '16x16', sizeCm: '40.6 x 40.6', price: 39.99 },
        { sizeIn: '20x20', sizeCm: '50.8 x 50.8', price: 54.99 },
        { sizeIn: '24x24', sizeCm: '61 x 61', price: 74.99 },
      ],
      framed: [
        { sizeIn: '16x16', sizeCm: '40.6 x 40.6', price: 109.99 },
        { sizeIn: '24x24', sizeCm: '61 x 61', price: 169.99 },
      ],
    },
  ];

  function goToContact() {
    goto('/contact');
  }
</script>

<svelte:head>
  <title>Photography Prints - Tania McCrea Steele Photography</title>
  <meta
    name="description"
    content="High-quality photography prints available for purchase. Professional printing by Loxley Colour with various sizes and framing options."
  />
</svelte:head>

<div class="prints-container">
  <div class="prints-content">
    <header class="prints-header">
      <h1>Photography Prints for Sale</h1>
      <p class="intro-text">
        High-quality photography prints are available for purchase, either as stand-alone prints or
        professionally framed. Please refer to the pricing chart below and complete the order form
        to get started.
      </p>
      <p class="payment-info">Payments are accepted via PayPal or bank transfer.</p>
      <p class="quality-info">
        All prints are produced by <strong
          ><a href="https://www.loxleycolour.com/" target="_blank" class="prints-link"
            >Loxley Colour</a
          ></strong
        >, a trusted professional print lab known for exceptional quality. Stand-alone prints
        include a small white border, making them easy to mount and frame to your preference.
      </p>
      <p class="support-text">
        Thank you for supporting my photography—your purchase helps me continue shooting by funding
        the equipment I need to capture more moments.
      </p>

      <div class="header-actions">
        <a href="#pricing-list" class="cta-button">View Prices</a>
        <button class="cta-button secondary" on:click={goToContact}>Contact Me</button>
      </div>
    </header>

    <FramingExamples />
    <div class="pricing-section" id="pricing-list">
      <h2>Photography Print & Framed Print Price List</h2>
      <p class="size-note">All sizes are listed in inches, with centimetre equivalents</p>

      {#each printRatios as ratio}
        <div class="ratio-section">
          <h3>{ratio.color} {ratio.title}</h3>

          <div class="tables-container">
            <div class="table-wrapper">
              <h4>Print Only</h4>
              <div class="price-table">
                <div class="table-header">
                  <span>Size (in)</span>
                  <span>Size (cm)</span>
                  <span>Price (£)</span>
                </div>
                {#each ratio.printOnly as print}
                  <div class="table-row">
                    <span>{print.sizeIn}</span>
                    <span>{print.sizeCm}</span>
                    <span>£{print.price.toFixed(2)}</span>
                  </div>
                {/each}
              </div>
            </div>

            {#if ratio.framed.length > 0}
              <div class="table-wrapper">
                <h4>Framed Prints</h4>
                <div class="price-table">
                  <div class="table-header">
                    <span>Size (in)</span>
                    <span>Size (cm)</span>
                    <span>Framed Price (£)</span>
                  </div>
                  {#each ratio.framed as print}
                    <div class="table-row">
                      <span>{print.sizeIn}</span>
                      <span>{print.sizeCm}</span>
                      <span>£{print.price.toFixed(2)}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <div class="order-section">
      <h2>Interested?</h2>

      <div class="contact-alternative">
        <p></p>
        <button class="contact-btn" on:click={goToContact}>Contact Me</button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  .prints-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }

  .prints-content {
    max-width: 1000px;
    width: 100%;
  }

  .prints-header {
    margin-bottom: 2rem;
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--color-gray-700);
  }

  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-gray-700);
  }

  h3 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--color-gray-700);
  }

  h4 {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--color-gray-600);
  }

  .prints-link {
    color: var(--color-gray-600);
    text-decoration: underline;
    transition: color ease 0.2s;
  }

  .prints-link:hover {
    color: var(--color-gray-800);
  }

  .intro-text,
  .payment-info,
  .quality-info,
  .support-text,
  .size-note {
    font-family: 'Poppins', sans-serif;
    color: var(--color-gray-600);
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .cta-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;
  }

  .cta-button {
    background-color: var(--color-gray-800, #2d3748);
    color: white;
    border-color: var(--color-gray-800, #2d3748);
  }

  .cta-button:hover {
    background-color: var(--color-gray-700, #4a5568);
    border-color: var(--color-gray-700, #4a5568);
  }

  .cta-button.secondary {
    background-color: transparent;
    color: var(--color-gray-700, #4a5568);
    border-color: var(--color-gray-600, #718096);
  }

  .cta-button.secondary:hover {
    background-color: var(--color-gray-100, #f7fafc);
    color: var(--color-gray-800, #2d3748);
  }

  .quality-info strong {
    color: var(--color-gray-700);
  }

  .pricing-section {
    margin-bottom: 3rem;
  }

  .ratio-section {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray-200);
    padding-bottom: 2rem;
  }

  .ratio-section:last-child {
    border-bottom: none;
  }

  .tables-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .table-wrapper {
    background: var(--color-gray-50);
    border-radius: 8px;
    padding: 1rem;
  }

  .price-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
  }

  .table-header {
    display: contents;
    font-weight: 600;
    color: var(--color-gray-700);
    font-size: 14px;
  }

  .table-header span {
    padding: 0.75rem 0.5rem;
    border-bottom: 2px solid var(--color-gray-300);
  }

  .table-row {
    display: contents;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: var(--color-gray-600);
  }

  .table-row span {
    padding: 0.5rem;
    border-bottom: 1px solid var(--color-gray-200);
  }

  .order-section {
    background: var(--color-gray-50);
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
  }

  .contact-alternative {
    margin-top: 2rem;
    text-align: center;
  }

  .contact-alternative p {
    font-family: 'Poppins', sans-serif;
    color: var(--color-gray-600);
    font-size: 14px;
    margin-bottom: 1rem;
  }

  .contact-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-gray-600);
    color: var(--color-gray-600);
    background: white;
    transition: all ease 0.2s;
    border-radius: 5px;
    font-size: 16px;
  }

  .contact-btn:hover {
    background-color: var(--color-gray-100);
  }

  @media (min-width: 768px) {
    .tables-container {
      flex-direction: row;
      gap: 2rem;
    }

    .table-wrapper {
      flex: 1;
    }

    .price-table {
      grid-template-columns: 1.2fr 1.5fr 1fr;
    }
  }
</style>
