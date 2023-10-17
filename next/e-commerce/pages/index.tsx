import { GetStaticProps } from 'next';
import { PageWrapper } from '@/components/PageWrapper';
import { HomePageData, PageProps } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  HomePageEntry,
  HomePageEntryMeta,
  ProductCategoryEntry,
  ProductCategoryEntryMeta,
  ProductEntry,
  ProductGenderEntryMeta,
} from '@/bcms/types';
import { productToLite } from '@/utils/product';
import React from 'react';
import { HomePageHome } from '@/components/home-page/Home';
import { HomepageCategories } from '@/components/home-page/Categories';
import { HomepageCta } from '@/components/home-page/CTA';
import { HomepageProducts } from '@/components/home-page/Products';

const HomePage: React.FC<PageProps<HomePageData>> = ({
  page,
  header,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <HomePageHome data={page.meta.hero} />
      <HomepageCategories
        data={page.categories.slice(0, 6)}
        ctaTheme="dark-green"
      />
      <HomepageCta data={page.meta.cta} />
      <HomepageCategories
        data={page.categories.slice(0, 6)}
        ctaTheme="orange"
      />
      <HomepageProducts products={page.products} filters={page.filters} />
    </PageWrapper>
  );
};

export default HomePage;
export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();

  try {
    const { header, footer } = await getHeaderAndFooter(client);
    // Get Home Page entry
    const homePage = (await client.entry.get({
      template: 'home_page',
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    const categories = (await client.entry.getAll({
      template: 'product_category',
    })) as ProductCategoryEntry[];
    const products = (await client.entry.getAll({
      template: 'product',
    })) as ProductEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          // Return Home Page entry
          meta: homePage.meta.en as HomePageEntryMeta,
          // Return Product Categories
          categories: categories.map((e) => {
            return {
              meta: e.meta.en as ProductCategoryEntryMeta,
              productsCount: products.filter(
                (p) => p.meta?.en?.categories.find((i) => i._id === e._id),
              ).length,
            };
          }),
          // Return Products lite
          products: products.map((e) => productToLite(e)).slice(0, 8),
          filters: {
            categories: products.slice(0, 8).reduce((acc, e) => {
              e.meta.en?.categories.forEach((i) => {
                if (
                  i.meta.en &&
                  !acc.find((c) => c.slug === i.meta.en?.slug) &&
                  categories.find((c) => c._id === i._id)
                ) {
                  acc.push(i.meta.en);
                }
              });

              return acc;
            }, [] as ProductCategoryEntryMeta[]),
            genders: products.slice(0, 8).reduce((acc, e) => {
              if (
                e.meta.en?.gender.meta.en &&
                !acc.find((i) => i.slug === e.meta.en?.gender.meta.en?.slug)
              ) {
                acc.push(e.meta.en.gender.meta.en);
              }

              return acc;
            }, [] as ProductGenderEntryMeta[]),
          },
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
