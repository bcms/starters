const { FS } = require('@thebcms/utils/fs');
const { ChildProcess } = require('@thebcms/utils/child-process');
const path = require('node:path');

async function updatePackages() {
    const fs = new FS(process.cwd());
    const frameworks = ['gatsby', 'next', 'nuxt', 'svelte', 'astro'];
    for (let i = 0; i < frameworks.length; i++) {
        const framework = frameworks[i];
        const dirs = await fs.readdir(framework);
        for (let j = 0; j < dirs.length; j++) {
            const dir = dirs[j];
            if (!(await fs.exist([framework, dir, 'package.json'], true))) {
                console.log(1);
                continue;
            }
            const packageJson = JSON.parse(
                await fs.readString([framework, dir, 'package.json']),
            );
            if (!packageJson.dependencies) {
                console.log(2);
                continue;
            }
            /**
             * @type {string[]}
             */
            const packagesToUpdate = [];
            for (const key in packageJson.dependencies) {
                if (key.startsWith('@thebcms/')) {
                    packagesToUpdate.push(key + '@latest');
                }
            }
            console.log('\n\n\n-----');
            console.log(
                `Updating packages for: ${framework}/${dir} -> ${packagesToUpdate.join(' ')}`,
            );
            console.log('-----\n\n\n');
            await ChildProcess.advancedExec(
                `npm i --save ${packagesToUpdate.join(' ')}`,
                {
                    cwd: path.join(process.cwd(), framework, dir),
                    onChunk(type, chunk) {
                        process[type].write(chunk);
                    },
                },
            ).awaiter;
        }
    }
}
exports.updatePackages = updatePackages;
