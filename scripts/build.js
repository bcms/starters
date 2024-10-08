const { FS } = require('@thebcms/utils/fs');
const path = require('node:path');
const AdmZip = require('adm-zip');
const { ChildProcess } = require('@thebcms/utils/child-process');
const { getArgs } = require('./utils/args');

/**
 * @return {Promise<void>}
 */
async function build() {
    const args = getArgs();
    if (!args.project) {
        throw Error('Missing project argument');
    }
    const fs = new FS(path.join(process.cwd(), args.build, args.project));
    if (await fs.exist('build.zip', true)) {
        await fs.deleteFile('build.zip');
    }
    const zip = new AdmZip();
    if (args.build === 'nuxt') {
        await ChildProcess.advancedExec(`npm run generate`, {
            cwd: fs.baseRoot,
            onChunk(type, chunk) {
                process[type].write(chunk);
            },
        }).awaiter;
        zip.addLocalFolder(path.join(fs.baseRoot, '.output', 'public'));
    } else if (args.build === 'next') {
        await ChildProcess.advancedExec(`npm run build`, {
            cwd: fs.baseRoot,
            onChunk(type, chunk) {
                process[type].write(chunk);
            },
        }).awaiter;
        zip.addLocalFolder(path.join(fs.baseRoot, 'out'));
    } else if (args.build === 'gatsby') {
        await ChildProcess.advancedExec(`npm run build`, {
            cwd: fs.baseRoot,
            onChunk(type, chunk) {
                process[type].write(chunk);
            },
        }).awaiter;
        zip.addLocalFolder(path.join(fs.baseRoot, 'public'));
    } else {
        throw Error(`Unknown build param: ${args.build}`);
    }
    await fs.save('build.zip', zip.toBuffer());
}
exports.build = build;