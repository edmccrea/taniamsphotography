<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="error-wrapper">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
  <a href="/">Go back home</a>
</div>

<style>
  .error-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 6rem;
    color: var(--color-gray-700);
    margin-bottom: 1rem;
    line-height: 1;
  }

  p {
    font-size: 1.5rem;
    color: var(--color-gray-600);
    margin-bottom: 2rem;
  }

  a {
    font-size: 1.125rem;
    color: var(--color-gray-800);
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-gray-600);
  }
</style>
