import {
  ProductColorEntry,
  ProductEntry,
  ProductEntryMeta,
  ProductImageGroup,
  ProductSizeEntryMeta,
  ProductSizeGroup,
} from '@/bcms/types';
import { PageData, ProductPageData } from '@/types';
import { productToLite } from '@/utils/product';
import React, { useMemo, useState } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import { ShopGallery } from '@/src/components/shop-page/Gallery';
import { ShopDetails } from '@/src/components/shop-page/Details';
import { graphql, Link } from 'gatsby';
import { ProductCard } from '@/src/components/ProductCard';
import { toLite } from '@/utils/toLite';

interface ShopPageProps {
  data: PageData<ProductPageData> & {
    products: {
      nodes: Array<{
        bcms: ProductEntry;
      }>;
    };
  };
}
const ShopPage: React.FC<ShopPageProps> = (props) => {
  const [activeColor, setActiveColor] = useState<ProductColorEntry>(
    (props.data.page.bcms.meta.en.gallery[0] as any).color.productColor as any,
  );

  const otherProducts = useMemo(() => {
    return props.data.products.nodes
      .filter(
        (product) =>
          product.bcms.meta.en?.slug !== props.data.page.bcms.meta.en.slug,
      )
      .map((product) => productToLite(product.bcms))
      .sort((a, b) => b.date - a.date)
      .slice(0, 4);
  }, [props.data.products]);

  const formattedMeta = useMemo(() => {
    const meta = props.data.page.bcms.meta.en;
    return {
      ...meta,
      gallery: meta.gallery.map((g) => {
        return {
          image: g.image,
          color: {
            meta: {
              en: toLite<
                ProductEntryMeta,
                { productColor: { meta: { en: ProductEntryMeta } } }
              >(g.color as any) as any,
            },
          },
        } as ProductImageGroup;
      }),
      sizes: meta.sizes.map((size) => {
        return {
          size: {
            meta: {
              en: toLite<
                ProductSizeEntryMeta,
                { productSize: { meta: { en: ProductSizeEntryMeta } } }
              >(size.size as any) as any,
            },
          },
          available: size.available,
        } as ProductSizeGroup;
      }),
    } as ProductEntryMeta;
  }, [props.data.page]);

  return (
    <PageWrapper
      page={props.data.page}
      header={props.data.header}
      footer={props.data.footer}
    >
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        {activeColor !== null && (
          <div className="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2">
            <ShopGallery
              gallery={formattedMeta.gallery}
              activeColor={activeColor}
            />
            <ShopDetails
              meta={formattedMeta}
              activeColor={activeColor}
              colorChange={(c) => setActiveColor(c)}
            />
          </div>
        )}
        {otherProducts.length > 0 && (
          <div>
            <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-8 lg:text-[24px] lg:flex-row">
              <div>Others you may like</div>
              <Link className="underline" to="/shop">
                See all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherProducts.map((product, index) => (
                <ProductCard key={index} card={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }

    page: bcmsProduct(bcms: { _id: { eq: $id } }) {
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

export default ShopPage;
