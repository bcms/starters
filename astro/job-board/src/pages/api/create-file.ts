export const prerender = false;
import type { APIRoute } from 'astro';
import { bcmsPrivate } from '../../bcms-private';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
        return new Response(
            JSON.stringify({
                message: 'Missing required fields',
            }),
            { status: 400 },
        );
    }

    const uploadToken = await bcmsPrivate.media.requestUploadToken();

    const image = await bcmsPrivate.media.createFile({
        file,
        uploadToken,
        name: file.name,
    });

    return new Response(
        JSON.stringify({
            imageId: image._id,
        }),
        { status: 200 },
    );
};
