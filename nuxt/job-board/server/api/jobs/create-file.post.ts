export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const data = await readMultipartFormData(event);

    if (!data) {
        return null;
    }

    let imageId: string | null = null;

    for (const [_idx, value] of data.entries()) {
        if (value.filename) {
            const file = new File([value.data as any], value.filename, {
                type: value.type,
            });

            const uploadToken = await bcms.media.requestUploadToken();

            const image = await bcms.media.createFile({
                file,
                uploadToken,
                name: value.filename,
            });

            imageId = image._id;
            break;
        }
    }

    return imageId;
});
