const { FS } = require('@thebcms/utils/fs');

async function removeNodeModules() {
    const fs = new FS(process.cwd());
    const frameworks = ['gatsby', 'next', 'nuxt', 'svelte', 'astro'];
    for (let i = 0; i < frameworks.length; i++) {
        const framework = frameworks[i];
        const dirs = await fs.readdir(framework);
        for (let j = 0; j < dirs.length; j++) {
            const dir = dirs[j];
            if (dir.startsWith('.')) {
                continue;
            }
            if (!(await fs.exist([framework, dir, 'node_modules']))) {
                console.log(1);
                continue;
            }
            console.log('\n\n\n-----');
            console.log(`Removing node_modules from: ${framework}/${dir}`);
            console.log('-----\n\n\n');
            await fs.deleteDir([framework, dir, 'node_modules']);
        }
    }
    console.log(`Removed node_modules from projects`);
}
exports.removeNodeModules = removeNodeModules;
