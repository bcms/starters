import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
} from '../../bcms/types';
import { BCMSClient } from '@becomes/cms-client/types';

export interface HeaderAndFooterResult {
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}

export async function getHeaderAndFooter(
  client: BCMSClient,
): Promise<HeaderAndFooterResult> {
  // Get Header entry
  const header = (await client.entry.get({
    // Template name or ID
    template: 'header',
    // Entry slug or ID
    entry: 'header',
  })) as HeaderEntry;
  // Get Footer entry
  const footer = (await client.entry.get({
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
