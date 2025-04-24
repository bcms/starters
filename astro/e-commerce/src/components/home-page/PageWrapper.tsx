import ContextWrapper from '../ContextWrapper';
import InnerPageWrapper from '../InnnerPageWrapper';
import type {
    HomeEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '../../../bcms/types/ts';
import { type ProductLite } from '../../utils/product';
import { HomeHero } from './Hero';
import { HomeCategories } from './Categories';
import { HomeCta } from './Cta';
import { HomeProducts } from './Products';
import type { ClientConfig } from '@thebcms/client';
import { bcmsPublic } from '../../bcms-public.ts';

interface Props {
    meta: HomeEntryMetaItem;
    categories: {
        meta: ProductCategoryEntryMetaItem;
        productsCount: number;
    }[];
    products: ProductLite[];
    filters: {
        genders: ProductGenderEntryMetaItem[];
        categories: ProductCategoryEntryMetaItem[];
    };
    bcms: ClientConfig;
}

const HomePageWrapper: React.FC<Props> = ({
    meta,
    categories,
    products,
    filters,
    bcms,
}) => {
    return (
        <ContextWrapper>
            <InnerPageWrapper bcms={bcms}>
                <HomeHero
                    title={meta.hero_title}
                    description={meta.hero_description}
                    image={meta.hero_cover_image}
                    bcms={bcmsPublic.getConfig()}
                />
                <HomeCategories
                    data={categories.slice(0, 6)}
                    ctaTheme="dark-green"
                    bcms={bcmsPublic.getConfig()}
                />
                <HomeCta
                    title={meta.cta_title}
                    description={meta.cta_description}
                    image={meta.cta_cover_image}
                    cta={{
                        label: meta.cta_label,
                        href: meta.cta_link,
                    }}
                    bcms={bcmsPublic.getConfig()}
                />
                <HomeCategories
                    data={categories.slice(6, 12)}
                    ctaTheme="orange"
                    bcms={bcmsPublic.getConfig()}
                />
                <HomeProducts
                    products={products}
                    filters={filters}
                    bcms={bcmsPublic.getConfig()}
                />
            </InnerPageWrapper>
        </ContextWrapper>
    );
};

export default HomePageWrapper;
