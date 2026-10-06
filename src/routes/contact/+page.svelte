<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Reveal from '#lib/components/Reveal.svelte';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
  let enquiry = $state<{ print: string; image: string | null; ratio: string | null } | null>(null);

  onMount(() => {
    const params = new URL(window.location.href).searchParams;
    if (!params.has('print')) return;
    const print = params.get('print') ?? '';
    const image = params.get('image');
    const ratio = params.get('ratio');
    enquiry = {
      print,
      image: image?.startsWith('https://www.datocms-assets.com/') ? image : null,
      ratio,
    };
    message = print
      ? `Hi Tania,\n\nI'd like to enquire about a print of: ${print}${ratio ? ` (${ratio})` : ''}.\n${enquiry.image ?? ''}\n\nSize and framing: \n`
      : `Hi Tania,\n\nI'd like to enquire about a print of: \n\nSize and framing: \n`;
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    status = 'sending';
    try {
      const res = await fetch('https://formsubmit.co/ajax/b347f3db706215ed180d366c7551f129', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, name, message }),
      });
      if (!res.ok) throw new Error(`Form submit failed with ${res.status}`);
      status = 'sent';
    } catch {
      status = 'error';
    }
  }
</script>

<svelte:head>
  <title>Contact Tania McCrea Steele | Photography Services</title>
  <meta
    name="description"
    content="Get in touch with Tania McCrea Steele for print enquiries, commissions and photography questions in Bradford on Avon and Wiltshire."
  />
</svelte:head>

<div class="contact-wrapper">
  {#if status === 'sent'}
    <div class="submitted" in:fade>
      <h1>Thank you.</h1>
      <p>Your message is on its way. I'll get back to you as soon as I can.</p>
      <a class="button secondary" href="/gallery">Back to the gallery</a>
    </div>
  {:else}
    <Reveal class="w-full">
      <div class="form-container">
        <h1>{enquiry ? 'Print enquiry.' : 'Get in touch.'}</h1>
        <p class="intro">
          {#if enquiry}
            Tell me the size you'd like and whether you'd like it framed. Prices are on the
            <a
              href="/shop{enquiry.ratio
                ? `?ratio=${encodeURIComponent(enquiry.ratio)}`
                : ''}#prices">prints page</a
            >.
          {:else}
            Prints, commissions, or just to say hello. I usually reply within a couple of days.
          {/if}
        </p>

        {#if enquiry?.print}
          <div class="enquiry-card">
            {#if enquiry.image}
              <img
                src="{enquiry.image}?w=240&h=240&fit=crop&auto=format"
                alt=""
                width="72"
                height="72"
              />
            {/if}
            <div>
              <span class="label">Photograph</span>
              <strong>{enquiry.print}</strong>
              {#if enquiry.ratio}<span class="ratio">Closest print ratio {enquiry.ratio}</span>{/if}
            </div>
          </div>
        {/if}

        <form onsubmit={handleSubmit}>
          <div class="field">
            <label for="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autocomplete="name"
              required
              bind:value={name}
            />
          </div>
          <div class="field">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autocomplete="email"
              required
              bind:value={email}
            />
          </div>
          <div class="field">
            <label for="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={enquiry ? 8 : 5}
              bind:value={message}
            ></textarea>
          </div>

          {#if status === 'error'}
            <p class="error" role="alert">
              Something went wrong and your message wasn't sent. Please try again in a moment.
            </p>
          {/if}

          <button class="button" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </Reveal>
  {/if}
</div>

<style>
  .contact-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
  }

  .submitted {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-ink);
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .intro,
  .submitted p {
    text-align: center;
    color: var(--color-gray-600);
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .intro a {
    color: var(--color-accent-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .form-container {
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }

  .enquiry-card {
    display: flex;
    gap: 0.9rem;
    align-items: center;
    padding: 0.85rem;
    border-radius: 8px;
    background: var(--color-accent-soft);
    margin-bottom: 1.25rem;
  }

  .enquiry-card img {
    width: 72px;
    height: 72px;
    border-radius: 5px;
    object-fit: cover;
    flex: 0 0 auto;
  }

  .enquiry-card div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .enquiry-card .label {
    font-size: 12px;
    color: var(--color-gray-500);
  }

  .enquiry-card strong {
    font-weight: 500;
    color: var(--color-ink);
    font-size: 14px;
  }

  .enquiry-card .ratio {
    font-size: 12px;
    color: var(--color-gray-600);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: var(--color-gray-600);
  }

  input,
  textarea {
    background: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    border: 1px solid var(--color-gray-300);
    border-radius: 6px;
    padding: 0.65rem 0.75rem;
    color: var(--color-ink);
    transition: border-color 160ms ease;
  }

  textarea {
    resize: vertical;
    line-height: 1.5;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-soft);
  }

  .error {
    font-size: 13px;
    color: #9b3b2e;
  }

  .button {
    display: inline-block;
    padding: 0.7rem 1.1rem;
    border-radius: 999px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    background: var(--color-accent);
    color: #fff;
    border: 1px solid var(--color-accent);
    transition:
      background 180ms ease,
      opacity 180ms ease;
  }

  .button:hover {
    background: var(--color-accent-strong);
  }

  .button:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  .button.secondary {
    background: transparent;
    color: var(--color-accent-strong);
    margin-top: 0.5rem;
  }

  .button.secondary:hover {
    background: var(--color-accent-soft);
  }
</style>
