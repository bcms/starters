/**
 * @type {import('@thebcms/cli/config').BCMSConfig}
 */
module.exports = {
    client: {
        orgId: process.env.BCMS_ORG_ID,
        instanceId: process.env.BCMS_INSTANCE_ID,
        apiKey: {
            id: process.env.BCMS_API_KEY_ID,
            secret: process.env.BCMS_API_KEY_SECRET,
        },
    },
};
