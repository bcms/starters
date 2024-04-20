import { NuxtApp } from 'nuxt/app';
import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
  LegalEntry,
} from '@/bcms/types';

export interface HeaderAndFooter {
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
  legal: LegalEntry[];
}

export async function getHeaderAndFooter(
  ctx: NuxtApp,
): Promise<HeaderAndFooter> {
  const header = (await ctx.$bcms.entry.get({
    // Template name or ID
    template: 'header',
    // Entry slug or ID
    entry: 'header',
  })) as HeaderEntry;
  const footer = (await ctx.$bcms.entry.get({
    // Template name or ID
    template: 'footer',
    // Entry slug or ID
    entry: 'footer',
  })) as FooterEntry;
  const legal = (await ctx.$bcms.entry.getAll({
    // Template name or ID
    template: 'legal',
  })) as LegalEntry[];
  return {
    header: header.meta.en as HeaderEntryMeta,
    footer: footer.meta.en as FooterEntryMeta,
    legal,
  };
}
