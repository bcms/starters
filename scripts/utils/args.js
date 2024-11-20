/**
 * @typedef {{
 *   build?: string;
 *   deplay?: string;
 *   project?: string;
 *   updatePackages?: string;
 *   removeNodeModules?: string;
 * }} Args
 */

/**
 * @return {Args}
 */
function getArgs() {
    /**
     * @type Args
     */
    const args = {};
    let lastKey = '';
    for (let i = 2; i < process.argv.length; i++) {
        const value = process.argv[i];
        if (lastKey) {
            args[lastKey] = value;
            lastKey = '';
        } else if (value.startsWith('--')) {
            lastKey = value.replace('--', '');
            args[lastKey] = '';
        }
    }
    return args;
}

exports.getArgs = getArgs;
