import { JobEntry } from './bcms/types';
import { getBcmsMost } from 'gatsby-source-bcms';
import path from 'path';

exports.createPages = async ({ actions }: any) => {
  const { createPage } = actions;

  // SINGLE job PAGES
  const jobTemplate = path.resolve('./src/templates/job.tsx');

  const bcms = getBcmsMost();
  const jobs = (await bcms.content.entry.find(
    'job',
    async () => true,
  )) as JobEntry[];
  if (jobs.length > 0) {
    jobs.forEach((job) => {
      createPage({
        path: `/jobs/${job.meta.en?.slug}`,
        component: jobTemplate,
        context: {
          id: job._id,
        },
      });
    });
  }
  // END OF SINGLE job PAGES
};
