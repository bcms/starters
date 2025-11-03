const { getArgs } = require('./utils/args');
const { ChildProcess } = require('@thebcms/utils/child-process');

async function deploy() {
    const args = getArgs();
    if (!args.project) {
        throw Error('Missing project argument');
    }
    if (!args.framework || !['nuxt'].includes(args.framework)) {
        throw Error(
            'Missing or invalid framework argument. Only "nuxt" is supported.',
        );
    }
    const serverUser = process.env.DEPLOY_SERVER_USER || args.deployServerUser;
    const serverIp = process.env.DEPLOY_SERVER_IP || args.deployServerIp;
    await ChildProcess.advancedExec(
        `scp ${args.framework}/${args.project}/build.zip ${serverUser}@${serverIp}:/home/starters/nuxt/build.zip`,
    ).awaiter;
    await ChildProcess.advancedExec(
        [
            'ssh',
            `${serverUser}@${serverIp}`,
            [
                `'cd /home/starters/nuxt`,
                `&& mkdir tmp`,
                `&& mv build.zip tmp/build.zip`,
                `&& cd tmp`,
                `&& unzip build.zip`,
                `&& rm build.zip`,
                `&& cd ..`,
                `&& rm -rf ${args.project}`,
                `&& mkdir ${args.project}`,
                `&& mkdir ${args.project}/.output`,
                `&& mv tmp ${args.project}/.output/public`,
                `&& chmod 755 -R ${args.project}'`,
            ].join(' '),
        ],
        {
            onChunk(type, chunk) {
                process[type].write(chunk);
            },
        },
    ).awaiter;
}
exports.deploy = deploy;
