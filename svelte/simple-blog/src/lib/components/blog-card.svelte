<script lang="ts">
	import ContentManager from './content-manager.svelte';
	import Tag from './tag.svelte';
	import type { BlogEntryMetaItem } from '../../../bcms/types/ts';
	import { toReadableDate } from '../../utils/date';
	import type { ClientConfig } from '@thebcms/client';
	import { BCMSImage } from '@thebcms/components-svelte';

	export let blog: BlogEntryMetaItem;
	export let bcmsConfig: ClientConfig;
</script>

<article>
	<a
		href={`/blog/${blog.slug}`}
		class="group w-full grid grid-cols-1 border border-solid border-appGray-200 rounded-2xl overflow-hidden md:grid-cols-[45%,55%]"
	>
		<div class="aspect-[1.25] self-stretch overflow-hidden">
			<BCMSImage
				clientConfig={bcmsConfig}
				media={blog.cover_image}
				class="size-full object-cover transition-transform duration-500 object-center group-hover:scale-105 group-focus-visible:scale-105"
			/>
		</div>
		<div class="flex flex-col self-center pt-6 max-md:px-4 max-md:pb-4 md:px-12">
			<h3 class="text-2xl font-semibold leading-none mb-4">
				{blog.title}
			</h3>
			<div class="flex items-center flex-wrap gap-2 mb-8">
				{#each blog.category as category}
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
					{toReadableDate(blog.date)}
				</div>
			</div>
			<ContentManager
				items={blog.description.nodes}
				class="text-appGray-300 font-medium leading-[1.38] tracking-[-0.36px] md:text-lg"
			/>
		</div>
	</a>
</article>
