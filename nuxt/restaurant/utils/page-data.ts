import type { NuxtApp } from 'nuxt/app';
import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
} from '@/bcms/types';

export interface HeaderAndFooter {
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
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
  return {
    header: header.meta.en as HeaderEntryMeta,
    footer: footer.meta.en as FooterEntryMeta,
  };
}
