<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    duration = 0.5,
    delay = 0,
    y = 20,
    class: className = '',
    children,
  }: {
    duration?: number;
    delay?: number;
    y?: number;
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div class="reveal {className}" style="--duration: {duration}s; --delay: {delay}s; --y: {y}px">
  {@render children()}
</div>

<style>
  .reveal {
    animation: reveal var(--duration) ease-out var(--delay) both;
  }

  @keyframes reveal {
    from {
      opacity: 0;
      transform: translateY(var(--y));
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      animation: none;
    }
  }
</style>
