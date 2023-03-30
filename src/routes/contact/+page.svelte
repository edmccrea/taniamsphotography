<script lang="ts">
  import { fade } from "svelte/transition";

  let name = "";
  let email = "";
  let message = "";
  let formSubmitted = false;

  function handleSubmit() {
    formSubmitted = true;
    name = "";
    email = "";
    message = "";
  }
</script>

<div class="contact-wrapper" in:fade>
  {#if formSubmitted}
    <div class="submitted" in:fade>
      <h1>Thanks.</h1>
      <p>I'll get back to you as soon as possible</p>
    </div>
  {:else}
    <h1>Get in touch.</h1>
    <form
      action="https://formsubmit.co/taniakm@yahoo.com"
      method="POST"
      on:submit|preventDefault={handleSubmit}
    >
      <input type="text" name="name" bind:value={name} placeholder="Name" />
      <input type="email" name="email" bind:value={email} placeholder="Email" />
      <textarea name="message" bind:value={message} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
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
  }

  button:hover {
    background: var(--color-gray-100);
  }
</style>
