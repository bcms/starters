<script lang="ts">
	import type { EntryContentParsedItem } from '@thebcms/types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { BCMSContentManager, type BCMSWidgetComponents } from '@thebcms/components-svelte';

	export let items: EntryContentParsedItem[];
	export let widgetComponents: BCMSWidgetComponents | undefined = undefined;
	export { className as class };

	let className = '';
	let managerDOM: HTMLDivElement | undefined = undefined;

	function parseInternalLinks(): void {
		if (managerDOM) {
			const links = managerDOM.querySelectorAll('a');
			links.forEach((link: HTMLAnchorElement) => {
				const href = link.getAttribute('href');
				if (href && href.startsWith('/')) {
					link.target = '_self';
					const clickHandler = (event: Event): void => {
						event.preventDefault();
						goto(href);
					};
					link.addEventListener('click', clickHandler);

					return () => {
						link.removeEventListener('click', clickHandler);
					};
				}
			});
		}
	}

	onMount(() => {
		parseInternalLinks();
	});
</script>

<div bind:this={managerDOM}>
	<BCMSContentManager class={className} {items} widgetComponents={widgetComponents || {}} />
</div>
