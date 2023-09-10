import {
  FooterEntry,
  FooterEntryMeta,
  HeaderEntry,
  HeaderEntryMeta,
  LegalEntry,
} from '@/bcms/types';
import {BCMSClient} from '@becomes/cms-client/types';

export interface HeaderAndFooter {
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
  legal: LegalEntry[];
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
  })) as LegalEntry[];
  return {
    header: header.meta.en as HeaderEntryMeta,
    footer: footer.meta.en as FooterEntryMeta,
    legal,
  };
}
