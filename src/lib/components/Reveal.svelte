<script lang="ts">
  import { inView, animate } from 'motion';
  import { onMount } from 'svelte';

  export let threshold = 0.1;
  export let duration = 0.5;
  export let delay = 0;
  export let y = 20;
  let className = '';
  export { className as class };

  let element: HTMLElement;

  onMount(() => {
    inView(element, () => {
      animate(
        element,
        { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] } as any,
        { duration, delay, easing: 'ease-out' } as any
      );
    }, { amount: threshold });
  });
</script>

<div bind:this={element} class="opacity-0 {className}">
  <slot />
</div>
