<script lang="ts">
  export let text: any;
</script>

<div class="text-block">
  {@html text}
</div>

<style>
  .text-block :global(p) {
    font-size: 16px;
    color: var(--color-gray-600);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .text-block :global(p):last-child {
    margin-bottom: 0;
  }
</style>
