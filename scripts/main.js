const { config } = require('dotenv');
config();
const { getArgs } = require('./utils/args');
const { build } = require('./build');

async function main() {
    const args = getArgs();
    if (args.build) {
        await build();
    } else {
        throw Error(`Unknown commands: ${JSON.stringify({ args }, null, 4)}`);
    }
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
