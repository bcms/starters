import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
  LegalPageEntry,
} from '../../bcms/types';
import { BCMSClient } from '@becomes/cms-client/types';

export interface HeaderAndFooter {
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
  legal: LegalPageEntry[];
}

export async function getHeaderAndFooter(
  client: BCMSClient,
): Promise<HeaderAndFooter> {
  const header = (await client.entry.get({
    // Template name or ID
    template: 'header',
    // Entry slug or ID
    entry: 'header',
  })) as HeaderEntry;
  const footer = (await client.entry.get({
    // Template name or ID
    template: 'footer',
    // Entry slug or ID
    entry: 'footer',
  })) as FooterEntry;
  const legal = (await client.entry.getAll({
    // Template name or ID
    template: 'legal',
  })) as LegalPageEntry[];
  return {
    header: header.meta.en as HeaderEntryMeta,
    footer: footer.meta.en as FooterEntryMeta,
    legal,
  };
}
