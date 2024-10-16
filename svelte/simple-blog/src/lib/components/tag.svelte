<script lang="ts">
	export let size: 'md' | 'lg' = 'md';
	export { className as class };

	let className = '';
	const sizeClass =
		size === 'md'
			? 'px-2 py-1 max-md:text-sm md:p-2'
			: 'px-3 py-2 text-xl font-medium rounded-lg md:px-5 md:py-4 md:text-2xl';
</script>

<button
	class="border border-appGray-200 bg-appGray-100 flex leading-none rounded-lg {sizeClass} {className}"
>
	<slot />
</button>
