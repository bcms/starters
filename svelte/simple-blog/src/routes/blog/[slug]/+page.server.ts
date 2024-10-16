import { bcms } from '../../../bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '../../../../bcms/types/ts';
import type { EntryContentParsedItem } from '@thebcms/types';

export const load = async (req) => {
	const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

	const blog = blogs.find((e) => e.meta.en?.slug === req.params.slug);

	if (!blog) {
		throw Error(`blog ${req.params.slug} not found`);
	}
	const data = {
		meta: blog.meta.en as BlogEntryMetaItem,
		content: blog.content.en as EntryContentParsedItem[],
	};

	const otherBlogs = blogs
		.filter((e) => e.meta.en?.slug !== req.params.slug)
		.slice(0, 2)
		.map((otherBlog) => {
			return otherBlog.meta.en as BlogEntryMetaItem;
		});

	return {
		blog: data,
		otherBlogs,
		bcmsConfig: bcms.getConfig(),
	};
};
