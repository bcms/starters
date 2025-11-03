export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const body = await readBody(event);

    const entryStatuses = await bcms.entryStatus.getAll();
    const draftStatus = entryStatuses.find(
        (status) => status.label.toLowerCase() === 'draft',
    );
    const entry = await bcms.entry.create('job-post', {
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

    return entry;
});
