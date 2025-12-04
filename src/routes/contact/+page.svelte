<script lang="ts">
  import { fade } from "svelte/transition";
  import Reveal from '$lib/components/Reveal.svelte';

  let name = "";
  let email = "";
  let message = "";
  let formSubmitted = false;
  let loading = false;

  async function handleSubmit() {
    loading = true;
    const res = await fetch(
      "https://formsubmit.co/ajax/b347f3db706215ed180d366c7551f129",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          message,
        }),
      }
    );
    formSubmitted = true;
    name = "";
    email = "";
    message = "";
    setTimeout(() => {
      loading = false;
    }, 3000);
  }
</script>

<svelte:head>
  <title>Contact Tania McCrea Steele | Photography Services</title>
  <meta
    name="description"
    content="Get in touch with Tania McCrea Steele for photography inquiries in Bradford on Avon and Wiltshire."
  />
</svelte:head>

<div class="contact-wrapper">
  {#if formSubmitted || loading}
    <div class="submitted" in:fade|global>
      <h1>Thanks.</h1>
      <p>I'll get back to you as soon as possible</p>
    </div>
  {:else}
    <Reveal>
      <h1>Get in touch.</h1>
      <form on:submit|preventDefault={handleSubmit}>
        <input type="text" name="name" bind:value={name} placeholder="Name" />
        <input type="email" name="email" bind:value={email} placeholder="Email" />
        <textarea name="message" bind:value={message} placeholder="Message"></textarea>
        <button aria-label="send" type="submit">Send</button>
      </form>
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
  }

  h1 {
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-gray-700);
  }

  p {
    margin-top: 0.5rem;
    color: var(--color-gray-600);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 400px;
  }

  input,
  textarea {
    background: none;
    font-family: "Poppins", sans-serif;
    border: 1px solid var(--color-gray-600);
    border-radius: 5px;
    padding: 0.5rem;
    color: var(--color-gray-600);
  }

  textarea {
    resize: none;
    height: 100px;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-gray-700);
  }

  button {
    background: none;
    border: 1px solid var(--color-gray-600);
    border-radius: 5px;
    padding: 0.5rem;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all ease 0.2s;
    color: var(--color-gray-600);
  }

  button:hover {
    background: var(--color-gray-100);
  }
</style>
