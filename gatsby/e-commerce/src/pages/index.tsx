import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '@/src/components/PageWrapper';
import {
  HomePageCategory,
  HomePageData,
  HomePageFilters,
  PageData,
  ProductLite,
} from '@/types';
import {
  ProductCategoryEntry,
  ProductCategoryEntryMeta,
  ProductEntry,
  ProductGenderEntryMeta,
} from '@/bcms/types';
import { toLite } from '@/utils/toLite';
import { HomepageCategories } from '@/src/components/home-page/Categories';
import { HomePageHome } from '@/src/components/home-page/Home';
import { HomepageCta } from '@/src/components/home-page/CTA';
import { productToLite } from '@/utils/product';
import { HomepageProducts } from '@/src/components/home-page/Products';

interface HomePageProps {
  data: PageData<HomePageData> & {
    categories: {
      nodes: Array<{
        bcms: ProductCategoryEntry;
      }>;
    };
    products: {
      nodes: Array<{
        bcms: ProductEntry;
      }>;
    };
  };
}
const Homepage: React.FC<HomePageProps> = ({ data }) => {
  const categories = useMemo<HomePageCategory[]>(() => {
    if (data.categories.nodes.length) {
      return data.categories.nodes.map((category) => {
        return {
          meta: category.bcms.meta as any,
          productsCount: data.products.nodes.flatMap((p) => {
            const _ = p.bcms.meta.en?.categories.map((c) =>
              toLite<
                ProductCategoryEntry,
                { productCategory: { meta: { en: ProductCategoryEntry } } }
              >(c as any),
            ) as any;

            return _?.filter((c: any) => c.slug === category.bcms.meta.en?.slug) || [];
          }).length,
        };
      });
    } else {
      return [];
    }
  }, [data.categories, data.products]);

  const products = useMemo<ProductLite[]>(() => {
    return data.products.nodes
      .map((product) => productToLite(product.bcms))
      .slice(0, 8);
  }, [data.products]);

  const filters = useMemo<HomePageFilters>(() => {
    return {
      categories: data.products.nodes.slice(0, 8).reduce((acc, e) => {
        e.bcms.meta.en?.categories?.forEach((i) => {
          const _ = toLite<
            ProductCategoryEntry,
            { productCategory: { meta: { en: ProductCategoryEntry } } }
          >(i as any) as any;
          if (
            !acc.find((c) => c.slug === _.slug) &&
            data.categories.nodes.find((c) => c.bcms._id === i._id)
          ) {
            acc.push(_);
          }
        });

        return acc;
      }, [] as ProductCategoryEntryMeta[]),
      genders: data.products.nodes.slice(0, 8).reduce((acc, e) => {
        const gender = toLite<
          ProductGenderEntryMeta,
          { productGender: { meta: { en: ProductGenderEntryMeta } } }
        >(e.bcms.meta.en?.gender as any);

        if (gender && !acc.find((i) => i.slug === gender.slug)) {
          acc.push(gender);
        }

        return acc;
      }, [] as ProductGenderEntryMeta[]),
    };
  }, [data.products, data.categories]);
  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer}>
      <HomePageHome data={data.page.bcms.meta.en.hero} />
      <HomepageCategories data={categories.slice(0, 6)} ctaTheme="dark-green" />
      <HomepageCta data={data.page.bcms.meta.en.cta} />
      <HomepageCategories data={categories.slice(6, 12)} ctaTheme="orange" />
      <HomepageProducts products={products} filters={filters} />
    </PageWrapper>
  );
};

export default Homepage;

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsHomePage {
      ...HomePage
    }
    categories: allBcmsProductCategory {
      nodes {
        bcms {
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
