import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { PageProps, ShopPageData } from '@/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  ProductBrandEntryMeta,
  ProductCategoryEntry,
  ProductCategoryEntryMeta,
  ProductEntry,
  ProductGenderEntryMeta,
} from '@/bcms/types';
import { productToLite } from '@/utils/product';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { ShopMainProducts } from '@/components/shop-page/Main';

const ShopIndexPage: React.FC<PageProps<ShopPageData>> = ({
  page,
  header,
  footer,
}) => {
  return (
    <PageWrapper
      defaultTitle="Shop"
      page={page}
      header={header}
      footer={footer}
    >
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <ShopMainProducts page={page} />
      </div>
    </PageWrapper>
  );
};

export default ShopIndexPage;
export const getStaticProps: GetStaticProps<
  PageProps<ShopPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    // Get all Products
    const products = (await client.entry.getAll({
      template: 'product',
    })) as ProductEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          products: products.map((e) => productToLite(e)),
          genders: products
            .map((e) => e.meta.en?.gender.meta.en as ProductGenderEntryMeta)
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
          categories: products
            .map((e) =>
              (e.meta.en?.categories as ProductCategoryEntry[]).map(
                (i) => i.meta.en as ProductCategoryEntryMeta,
              ),
            )
            .flat()
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
          brands: products
            .map((e) => e.meta.en?.brand.meta.en as ProductBrandEntryMeta)
            .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e),
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
