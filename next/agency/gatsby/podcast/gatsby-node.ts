import { EpisodeEntry } from '@/bcms/types';
import { NodePluginArgs } from 'gatsby';
import { getBcmsMost } from 'gatsby-source-bcms';

import path from 'path';

exports.createPages = async ({ actions }: NodePluginArgs) => {
  const { createPage } = actions;

  // SINGLE EPISODE PAGE
  const episodeTemplate = path.resolve('./src/templates/episode.tsx');

  const bcms = getBcmsMost();
  const episodes = (await bcms.content.entry.find(
    'episode',
    async () => true,
  )) as EpisodeEntry[];

  if (episodes.length > 0) {
    episodes.forEach((episode) => {
      createPage({
        path: `/episode/${episode.meta.en?.slug}`,
        component: episodeTemplate,
        context: {
          id: episode._id,
        },
      });
    });
  }
  // END OF SINGLE EPISODE PAGES
};
