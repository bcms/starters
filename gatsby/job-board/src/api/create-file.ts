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

    const file = (req as any).files[0];

    const newFile = new File([file.buffer], file.originalname, {
        type: file.mimetype,
    });

    try {
        const uploadToken = await bcms.media.requestUploadToken();

        const image = await bcms.media.createFile({
            file: newFile,
            uploadToken,
            name: newFile.name,
        });

        res.status(200).json({ imageId: image._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong. Please try again later.',
        });
    }
}
