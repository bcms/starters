import {
  createBcmsMostServerRoutes,
  createBcmsMostServerRoute,
} from '@becomes/cms-most';

export default createBcmsMostServerRoutes({
  '/home.json': createBcmsMostServerRoute({
    method: 'get',
    async handler({ bcms }) {
      await bcms.template.pull();
      const result = await bcms.template.find(async () => true);
      return result.map((temp) => {
        return {
          title: temp.label,
          slug: '/' + temp.name,
        };
      });
    },
  }),
  '/template/:template/entry/:entry/data.json': createBcmsMostServerRoute({
    method: 'get',
    async handler({ bcms, params }) {
      return await bcms.content.entry.findOne(
        params.template,
        async (e) => e.meta.en.slug === params.entry,
      );
    },
  }),
});
