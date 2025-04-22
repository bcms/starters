<script lang="ts">
	import Tag from '$lib/components/tag.svelte';
	import BlogCard from '$lib/components/blog-card.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>BCMS - Simple Blog</title>
	<meta name="description" content="BCMS - Simple Blog" />
</svelte:head>

<div class="py-24 md:py-32">
	<div class="container">
		<div class="flex flex-col gap-6 items-center text-center mb-20 md:mb-[120px]">
			<Tag size="lg">Hi, I’m Mark 👋</Tag>
			<h1 class="text-4xl font-bold leading-none md:text-5xl">This is my blog</h1>
		</div>
		<div>
			<div class="grid grid-cols-1 gap-12 max-w-[1040px] mx-auto">
				{#each data.items as item}
					<BlogCard bcmsConfig={data.bcmsConfig} blog={item} />
				{/each}
			</div>
		</div>
	</div>
</div>
