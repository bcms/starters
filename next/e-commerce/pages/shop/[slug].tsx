import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getBcmsClient } from 'next-plugin-bcms';
import {
  ProductColorEntry,
  ProductEntry,
  ProductEntryMeta,
} from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import { PageProps, ProductPageData } from '@/types';
import { productToLite } from '@/utils/product';
import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { ShopGallery } from '@/components/shop-page/Gallery';
import { ShopDetails } from '@/components/shop-page/Details';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

const ShopPage: React.FC<PageProps<ProductPageData>> = (props) => {
  const [activeColor, setActiveColor] = useState<ProductColorEntry>(
    props.page.meta.gallery[0].color,
  );

  return (
    <PageWrapper page={props.page} header={props.header} footer={props.footer}>
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        {activeColor !== null && (
          <div className="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2">
            <ShopGallery
              gallery={props.page.meta.gallery}
              activeColor={activeColor}
            />
            <ShopDetails
              meta={props.page.meta}
              activeColor={activeColor}
              colorChange={(c) => setActiveColor(c)}
            />
          </div>
        )}
        {props.page.otherProducts.length > 0 && (
          <div>
            <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-8 lg:text-[24px] lg:flex-row">
              <div>Others you may like</div>
              <Link href="/shop">
                <a className="underline">See all</a>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {props.page.otherProducts.map((product, index) => (
                <ProductCard key={index} card={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ShopPage;
interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const products = (await client.entry.getAll({
    template: 'product',
  })) as ProductEntry[];
  const paths = products.map((product) => {
    const meta = product.meta.en as ProductEntryMeta;
    return {
      params: {
        slug: meta.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps<ProductPageData>
> = async (ctx: GetStaticPropsContext) => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);

    const productPage = (await client.entry.get({
      // Template name or ID
      template: 'product',
      // Entry slug or ID
      entry: ctx?.params?.slug as string,
    })) as ProductEntry;
    // Get all product entries
    const products = (await client.entry.getAll({
      // Template name or ID
      template: 'product',
    })) as ProductEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          meta: productPage.meta.en as ProductEntryMeta,
          otherProducts: products
            .filter((e) => e.meta.en?.slug !== productPage.meta.en?.slug)
            .map((e) => productToLite(e))
            .sort((a, b) => b.date - a.date)
            .slice(0, 4),
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
