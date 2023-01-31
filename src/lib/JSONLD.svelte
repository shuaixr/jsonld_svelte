<script lang="ts">
	export let json_ld: unknown;
</script>

<svelte:head
	>{@html `
    <script type="application/ld+json">
            ${JSON.stringify(json_ld)}
    </script>`}
</svelte:head>
