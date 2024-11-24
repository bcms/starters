import { ClientConfig } from '@thebcms/client';
import {
    AboutPageEntryMetaItem,
    HomePageEntryMetaItem,
    PortfolioEntry,
    PortfolioPageEntryMetaItem,
    ServiceEntry,
    ServicesPageEntryMetaItem,
    TestimonialEntry,
    TestimonialsPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    servicesMeta: ServicesPageEntryMetaItem;
    services: ServiceEntry[];
    aboutMeta: AboutPageEntryMetaItem;
    portfolioMeta: PortfolioPageEntryMetaItem;
    portfolio: PortfolioEntry[];
    testimonialsMeta: TestimonialsPageEntryMetaItem;
    testimonials: TestimonialEntry[];
    bcms: ClientConfig;
}
