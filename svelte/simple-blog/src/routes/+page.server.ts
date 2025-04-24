import type { BlogEntry, BlogEntryMetaItem } from '../../bcms/types/ts';
import { bcmsPrivate } from '../bcms-private';
import { bcmsPublic } from '../bcms-public';

export const load = async () => {
	const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];

	const items = blogs.map((blog) => {
		return blog.meta.en as BlogEntryMetaItem;
	});

	return { items, bcmsConfig: bcmsPublic.getConfig() };
};
