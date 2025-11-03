export const prerender = false;
import type { APIRoute } from 'astro';
import { bcmsPrivate } from '../../bcms-private';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();

    const body: {
        [key: string]: any;
    } = {};

    for (const [key, value] of data.entries()) {
        if (
            typeof value === 'string' &&
            value.startsWith('{') &&
            value.endsWith('}')
        ) {
            try {
                body[key] = JSON.parse(value);
                continue;
            } catch (e) {
                // ignore
            }
        } else {
            body[key] = value;
        }
    }

    const entryStatuses = await bcmsPrivate.entryStatus.getAll();
    const draftStatus = entryStatuses.find(
        (status) => status.label.toLowerCase() === 'draft',
    );
    await bcmsPrivate.entry.create('job-post', {
        statuses: draftStatus ? [{ lng: 'en', id: draftStatus._id }] : [],
        meta: [
            {
                lng: 'en',
                data: body,
            },
        ],
        content: [
            {
                lng: 'en',
                nodes: [],
            },
        ],
    });

    return new Response(
        JSON.stringify({
            success: true,
        }),
        { status: 200 },
    );
};
