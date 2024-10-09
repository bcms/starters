const { config } = require('dotenv');
config();
const { getArgs } = require('./utils/args');
const { build } = require('./build');
const { updatePackages } = require('./update-packages');

async function main() {
    const args = getArgs();
    if (args.build) {
        await build();
    } else if (args.updatePackages) {
        await updatePackages();
    } else {
        throw Error(`Unknown commands: ${JSON.stringify({ args }, null, 4)}`);
    }
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
