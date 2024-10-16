import { bcms } from '../bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '../../bcms/types/ts';

export const load = async () => {
	const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

	const items = blogs.map((blog) => {
		return blog.meta.en as BlogEntryMetaItem;
	});

	return { items, bcmsConfig: bcms.getConfig() };
};
