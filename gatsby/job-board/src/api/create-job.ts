import { Client } from '@thebcms/client';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default async function handler(
    req: GatsbyFunctionRequest,
    res: GatsbyFunctionResponse,
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const bcms = new Client({ injectSvg: true });

    try {
        const entryStatuses = await bcms.entryStatus.getAll();
        const draftStatus = entryStatuses.find(
            (status) => status.label.toLowerCase() === 'draft',
        );
        await bcms.entry.create('job-post', {
            statuses: draftStatus ? [{ lng: 'en', id: draftStatus._id }] : [],
            meta: [
                {
                    lng: 'en',
                    data: JSON.parse(req.body),
                },
            ],
            content: [
                {
                    lng: 'en',
                    nodes: [],
                },
            ],
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong. Please try again later.',
        });
    }
}
