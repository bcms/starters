const { getArgs } = require('./utils/args');
const { ChildProcess } = require('@thebcms/utils/child-process');

async function deploy() {
    const args = getArgs();
    if (!args.project) {
        throw Error('Missing project argument');
    }
    const serverUser = process.env.DEPLOY_SERVER_USER;
    const serverIp = process.env.DEPLOY_SERVER_IP;
    await ChildProcess.advancedExec(
        `scp next/${args.project}/bundle.zip ${serverUser}@${serverIp}:/home/starters/${args.project}/bundle.zip`,
    ).awaiter;
    await ChildProcess.advancedExec(
        [
            'ssh',
            `${serverUser}@${serverIp}`,
            `'cd /home/starters && rm -rf ${args.project}/out && cd ${args.project} && unzip bundle.zip && rm bundle.zip && chmod 755 -R out'`,
        ],
        {
            onChunk(type, chunk) {
                process[type].write(chunk);
            },
        },
    ).awaiter;
}
exports.deploy = deploy;
