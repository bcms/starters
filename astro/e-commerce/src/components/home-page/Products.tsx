import React, { useEffect, useMemo, useState } from 'react';
import TrashIcon from '../../assets/icons/trash.svg?raw';
import type { ProductLite } from '../../utils/product';
import type {
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';
import { FormCheck } from '../form/Check';
import { ProductCard } from '../ProductCard';

interface Props {
    products: ProductLite[];
    filters: {
        genders: ProductGenderEntryMetaItem[];
        categories: ProductCategoryEntryMetaItem[];
    };
    bcms: ClientConfig;
}

export interface ProductFilter {
    type: 'category' | 'brand' | 'gender' | 'price' | 'popularity';
    label: string;
    value: string | number;
    active: boolean;
}

export const HomeProducts: React.FC<Props> = ({ products, filters, bcms }) => {
    const [productFilters, setProductFilters] = useState<ProductFilter[]>([]);

    const activeFilters = useMemo<ProductFilter[]>(() => {
        return productFilters.filter((e) => e.active);
    }, [productFilters]);

    const clearFilters = () => {
        productFilters.forEach((filter) => {
            filter.active = false;
        });
        setProductFilters([...productFilters]);
    };

    const filteredProducts = useMemo(() => {
        return products.filter((e) => {
            let show = true;

            activeFilters.forEach((filter) => {
                if (filter.type === 'gender' && filter.active) {
                    show = show && e.gender.slug === filter.value;
                }
                if (filter.type === 'category' && filter.active) {
                    show =
                        show &&
                        !!e.categories.find(
                            (c) => c.meta.en?.slug === filter.value,
                        );
                }
            });
            return show;
        });
    }, [products, activeFilters]);

    useEffect(() => {
        const mappedFilters: ProductFilter[] = filters.genders.map((gender) => {
            return {
                active: false,
                label: gender.title,
                value: gender.slug,
                type: 'gender',
            };
        });

        const mappedCategories: ProductFilter[] = filters.categories.map(
            (category) => {
                return {
                    active: false,
                    label: category.title,
                    value: category.slug,
                    type: 'category',
                };
            },
        );

        setProductFilters([...mappedFilters, ...mappedCategories]);
    }, []);

    const setFilter = (value: string) => {
        const mappedFilters = productFilters.map((p) => {
            if (p.value === value) {
                return { ...p, active: !p.active };
            }

            return p;
        });

        setProductFilters(mappedFilters);
    };

    return (
        <section>
            <div className="container py-[72px]">
                <div className="flex flex-col items-start justify-between gap-12 mb-16 md:flex-row md:gap-20">
                    <div className="flex flex-wrap gap-8">
                        {productFilters.map((filter, index) => {
                            return (
                                <FormCheck
                                    key={index}
                                    value={filter.value as string}
                                    label={filter.label}
                                    onCheck={(value) => setFilter(value)}
                                    checked={!filter.active}
                                />
                            );
                        })}
                    </div>
                    <button
                        className="flex items-center gap-2 transition-colors duration-300 hover:text-appError"
                        onClick={clearFilters}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: TrashIcon,
                            }}
                            className="w-6 h-6"
                        />
                        <span className="text-lg leading-none tracking-[-2%] mb-1 md:text-[24px]">
                            Clear filters
                        </span>
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-12">
                    {filteredProducts.map((card, index) => {
                        return (
                            <ProductCard key={index} card={card} bcms={bcms} />
                        );
                    })}
                </div>
                <a
                    href="/shop"
                    className="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
                >
                    See all
                </a>
            </div>
        </section>
    );
};
