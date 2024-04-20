import {
  ProductBrandEntryMeta,
  ProductCategoryEntryMeta,
  ProductColorEntryMeta,
  ProductEntry,
  ProductEntryMeta,
  ProductGenderEntryMeta,
  ProductSizeEntryMeta,
  ProductSizeGroup,
} from '@/bcms/types';
import { ProductLite } from '@/types';
import { toLite } from '@/utils/toLite';

export const productToLite = (product: ProductEntry): ProductLite => {
  const meta = product.meta.en as ProductEntryMeta;

  return {
    title: meta.title,
    slug: meta.slug,
    cover: meta.gallery[0].image,
    price: meta.price,
    discounted_price: meta.discounted_price,
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
    gender: toLite<
      ProductGenderEntryMeta,
      { productGender: { meta: { en: ProductGenderEntryMeta } } }
    >(meta.gender as any),
    categories: meta.categories.map((c) =>
      toLite<
        ProductCategoryEntryMeta,
        { productCategory: { meta: { en: ProductCategoryEntryMeta } } }
      >(c as any),
    ),
    brand: toLite<
      ProductBrandEntryMeta,
      { productBrand: { meta: { en: ProductBrandEntryMeta } } }
    >(meta.brand as any),

    units_sold: meta.units_sold || 0,
    date: product.createdAt,
    color: toLite<
      ProductColorEntryMeta,
      { productColor: { meta: { en: ProductColorEntryMeta } } }
    >(meta.gallery[0].color as any),
  };
};
