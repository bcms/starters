import {
  ProductBrandEntryMeta,
  ProductCategoryEntryMeta,
  ProductColorEntryMeta,
  ProductEntry,
  ProductEntryMeta,
  ProductGenderEntryMeta,
} from '~~/bcms/types';
import { ProductLite } from '~~/types';

export const productToLite = (product: ProductEntry): ProductLite => {
  const meta = product.meta.en as ProductEntryMeta;

  return {
    title: meta.title,
    slug: meta.slug,
    cover: meta.gallery[0].image,
    price: meta.price,
    discounted_price: meta.discounted_price,
    sizes: meta.sizes,
    gender: meta.gender.meta.en as ProductGenderEntryMeta,
    categories: meta.categories.map(
      (e) => e.meta.en as ProductCategoryEntryMeta,
    ),
    brand: meta.brand.meta.en as ProductBrandEntryMeta,
    units_sold: meta.units_sold || 0,
    date: product.createdAt,
    color: meta.gallery[0].color.meta.en as ProductColorEntryMeta,
  };
};
