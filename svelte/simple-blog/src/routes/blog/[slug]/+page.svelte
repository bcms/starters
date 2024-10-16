<script lang="ts">
	import type { PageData } from './$types';

	import { BCMSImage } from '@thebcms/components-svelte';
	import ContentManager from '$lib/components/content-manager.svelte';
	import BlogCard from '$lib/components/blog-card.svelte';
	import Tag from '$lib/components/tag.svelte';
	import { toReadableDate } from '../../../utils/date';

	export let data: PageData;
</script>

<div class="py-24 md:py-32">
	<div class="container">
		<a
			href="/"
			class="border border-appGray-200 bg-appGray-100 flex w-fit leading-none px-3 py-2 text-xl font-medium rounded-lg transition-colors duration-300 hover:bg-appGray-200 focus-visible:bg-appGray-200 mb-14 md:mb-20 md:px-5 md:py-4 md:text-2xl"
		>
			Back to home
		</a>
		<div>
			<header class="mb-10 md:mb-16">
				<div
					class="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between"
				>
					<h1 class="text-3xl font-semibold leading-none md:text-[40px]">
						{data.blog.meta.title}
					</h1>
					<div class="flex items-center flex-wrap gap-2">
						{#each data.blog.meta.category as category}
							<Tag class="capitalize">
								{category.toLowerCase()}
							</Tag>
						{/each}
						<svg
							width="5"
							height="5"
							viewBox="0 0 5 5"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
						</svg>
						<div class="leading-none">
							{toReadableDate(data.blog.meta.date)}
						</div>
					</div>
				</div>
				<BCMSImage
					clientConfig={data.bcmsConfig}
					media={data.blog.meta.cover_image}
					class="w-full aspect-[2.21] object-cover rounded-2xl md:rounded-3xl"
				/>
			</header>
			<ContentManager items={data.blog.content} class="prose max-w-full lg:prose-lg" />
		</div>
		{#if data.otherBlogs.length > 0}
			<div class="max-w-[1040px] mt-20">
				<h3
					class="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl"
				>
					See my other blogs
				</h3>
				<div class="grid grid-cols-1 gap-12">
					{#each data.otherBlogs as blog}
						<BlogCard {blog} bcmsConfig={data.bcmsConfig} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
