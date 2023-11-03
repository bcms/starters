import * as fs from 'fs';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  if ((req as any)._parsedOriginalUrl.path.startsWith('/api/bcms-media/')) {
    const apiRes = await fetch(
      `http://localhost:3001${(req as any)._parsedOriginalUrl.path.replace(
        'bcms-media',
        'bcms-images',
      )}`,
    );
    const fileInfo = await apiRes.json();
    res.status(200);
    res.setHeader('Content-Type', fileInfo.mimetype as string);
    fs.createReadStream(fileInfo.path).pipe(res, {
      end: true,
    });
  } else {
    res.status(404).send('Not found');
  }
}
