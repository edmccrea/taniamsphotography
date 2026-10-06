<script lang="ts">
  let { subtitle }: { subtitle: string | undefined } = $props();
</script>

<div class="subtitle-block">
  <h2>{subtitle}</h2>
</div>

<style>
  .subtitle-block {
    margin: 2rem 0 1rem;
    padding-left: 1rem;
    border-left: 4px solid var(--color-gray-300);
  }

  h2 {
    font-size: 28px;
    font-weight: 600;
    color: var(--color-gray-800);
    line-height: 1.3;
  }
</style>
