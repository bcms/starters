import React, { useMemo } from 'react';
import { PageData, ShopPageData } from '@/types';
import {
  ProductBrandEntryMeta,
  ProductCategoryEntry,
  ProductEntry,
  ProductGenderEntryMeta,
} from '@/bcms/types';
import { productToLite } from '@/utils/product';
import { PageWrapper } from '@/src/components/PageWrapper';
import { ShopMainProducts } from '@/src/components/shop-page/Main';
import { graphql } from 'gatsby';
import { toLite } from '@/utils/toLite';

interface ShopIndexPageProps {
  data: PageData<null> & {
    products: {
      nodes: Array<{
        bcms: ProductEntry;
      }>;
    };
  };
}

const ShopIndexPage: React.FC<ShopIndexPageProps> = ({ data }) => {
  const shopPageData = useMemo<ShopPageData>(() => {
    const brands = data.products.nodes
      .map(
        (e: any) =>
          e.bcms.meta.en?.brand?.productBrand?.meta.en as ProductBrandEntryMeta,
      )
      .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e);

    const genders = data.products.nodes
      .map(
        (e: any) =>
          e.bcms.meta.en?.gender?.productGender?.meta
            .en as ProductGenderEntryMeta,
      )
      .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e);

    const categories = data.products.nodes
      .flatMap((product) => {
        return product.bcms.meta.en?.categories.map((c) =>
          toLite<
            ProductCategoryEntry,
            { productCategory: { meta: { en: ProductCategoryEntry } } }
          >(c as any),
        ) as any;
      })
      .filter((e, _, arr) => arr.find((i) => i.slug === e.slug) === e);
    const products = data.products.nodes.map((p) => productToLite(p.bcms));

    return {
      categories,
      brands,
      genders,
      products,
    };
  }, [data.products]);
  return (
    <PageWrapper
      defaultTitle="Shop"
      page={data.page}
      header={data.header}
      footer={data.footer}
    >
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <ShopMainProducts page={shopPageData} />
      </div>
    </PageWrapper>
  );
};

export default ShopIndexPage;

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }

    products: allBcmsProduct {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
              seo {
                title
                description
              }
              gallery {
                image {
                  _id
                  caption
                  alt_text
                  height
                  name
                  src
                  svg
                  width
                }

                color {
                  productColor {
                    meta {
                      en {
                        title
                        slug
                        hex
                      }
                    }
                  }
                }
              }
              brand {
                productBrand {
                  meta {
                    en {
                      title
                      slug
                    }
                  }
                }
              }

              price
              discounted_price
              description {
                type
                name
                value
              }
              units_sold
              sizes {
                size {
                  productSize {
                    meta {
                      en {
                        title
                        slug
                      }
                    }
                  }
                }
                available
              }
              categories {
                productCategory {
                  meta {
                    en {
                      title
                      slug
                      gallery {
                        _id
                        caption
                        alt_text
                        height
                        name
                        src
                        svg
                        width
                      }
                    }
                  }
                }
              }

              gender {
                productGender {
                  meta {
                    en {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
