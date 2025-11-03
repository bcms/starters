import { bcmsPrivate } from '@/app/bcms-private';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    if (!body) {
        return NextResponse.json({ error: 'No data sent' }, { status: 400 });
    }

    const entryStatuses = await bcmsPrivate.entryStatus.getAll();
    const draftStatus = entryStatuses.find(
        (status) => status.label.toLowerCase() === 'draft',
    );
    const entry = await bcmsPrivate.entry.create('job-post', {
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

    return NextResponse.json({ success: true, entry });
}
