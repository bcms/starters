import { bcmsPrivate } from '@/app/bcms-private';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json(
            { error: 'No file uploaded' },
            { status: 400 },
        );
    }

    const uploadToken = await bcmsPrivate.media.requestUploadToken();

    const image = await bcmsPrivate.media.createFile({
        file,
        uploadToken,
        name: file.name,
    });

    return NextResponse.json({ success: true, fileId: image._id });
}
