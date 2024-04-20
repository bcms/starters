import { NuxtApp } from 'nuxt/app';
import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
} from '~~/bcms/types';

export async function getHeaderAndFooter(ctx: NuxtApp) {
  // Get Header entry
  const header = (await ctx.$bcms.entry.get({
    // Template name or ID
    template: 'header',
    // Entry slug or ID
    entry: 'header',
  })) as HeaderEntry;
  // Get Footer entry
  const footer = (await ctx.$bcms.entry.get({
    // Template name or ID
    template: 'footer',
    // Entry slug or ID
    entry: 'footer',
  })) as FooterEntry;
  return {
    // Return Header entry meta for `en` locale
    header: header.meta.en as HeaderEntryMeta,
    // Return Footer entry meta for `en` locale
    footer: footer.meta.en as FooterEntryMeta,
  };
}
