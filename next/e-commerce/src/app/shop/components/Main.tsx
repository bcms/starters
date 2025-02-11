'use client';

import { ClientConfig } from '@thebcms/client';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ProductBrandEntryMetaItem,
    ProductCategoryEntryMetaItem,
    ProductGenderEntryMetaItem,
} from '@bcms-types/types/ts';
import SearchIcon from '@/assets/icons/search.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { ProductLite } from '@/utils/product';
import { FormCheck } from '@/components/form/Check';
import { ProductFilter } from '@/app/components/Products';
import { ProductCard } from '@/components/ProductCard';

interface Props {
    products: ProductLite[];
    genders: ProductGenderEntryMetaItem[];
    categories: ProductCategoryEntryMetaItem[];
    brands: ProductBrandEntryMetaItem[];
    bcms: ClientConfig;
}

export const Main: React.FC<Props> = ({
    products,
    genders,
    categories,
    brands,
    bcms,
}) => {
    const [loadedProducts, setLoadedProducts] = useState(12);
    const [searchVal, setSearchVal] = useState('');
    const [filters, setFilters] = useState<ProductFilter[]>([
        {
            active: false,
            type: 'price',
            label: 'Lowest',
            value: 0,
        },
        {
            active: false,
            type: 'price',
            label: 'Most expensive',
            value: 1,
        },
        {
            active: false,
            type: 'popularity',
            label: 'Best selling',
            value: 0,
        },
        {
            active: false,
            type: 'popularity',
            label: 'New comer',
            value: 1,
        },
    ]);

    useEffect(() => {
        const gendersFilters = genders.map((gender) => {
            return {
                active: false,
                label: gender.title,
                value: gender.slug,
                type: 'gender',
            };
        }) as ProductFilter[];

        const categoriesFilters = categories.map((category) => {
            return {
                active: false,
                label: category.title,
                value: category.slug,
                type: 'category',
            };
        }) as ProductFilter[];
        const brandsFilters = brands.map((brand) => {
            return {
                active: false,
                label: brand.title,
                value: brand.slug,
                type: 'brand',
            };
        }) as ProductFilter[];

        setFilters([
            ...filters,
            ...brandsFilters,
            ...categoriesFilters,
            ...gendersFilters,
        ]);
    }, []);

    const activeFilters = useMemo(() => {
        return filters.filter((e) => e.active);
    }, [filters]);

    const clearFilters = () => {
        const _filters = filters.map((filter) => {
            return {
                ...filter,
                active: false,
            };
        }) as ProductFilter[];

        setFilters(_filters);
        setSearchVal('');
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((e) => {
                let show = true;
                if (searchVal) {
                    show =
                        show &&
                        `${e.title} $${e.price} ${
                            e.discounted_price ? '$' + e.discounted_price : ''
                        } ${e.brand.title} ${e.gender.title} ${e.categories
                            .map((i) => i.meta.en?.title)
                            .join(' ')}`
                            .toLowerCase()
                            .includes(searchVal.toLowerCase());
                }

                activeFilters.forEach((filter) => {
                    switch (filter.type) {
                        case 'gender':
                            show = show && e.gender.slug === filter.value;
                            break;
                        case 'category':
                            show =
                                show &&
                                !!e.categories.find(
                                    (c) => c.meta.en?.slug === filter.value,
                                );
                            break;
                        case 'brand':
                            show = show && e.brand.slug === filter.value;
                            break;
                        default:
                            break;
                    }
                });

                return show;
            })
            .sort((a, b) => {
                const priceFilter = activeFilters.find(
                    (e) => e.type === 'price',
                );

                if (priceFilter) {
                    if (priceFilter.value === 0) {
                        return a.price - b.price;
                    } else if (priceFilter.value === 1 && priceFilter.active) {
                        return b.price - a.price;
                    }
                }
                return 0;
            })
            .sort((a, b) => {
                const popularityFilter = activeFilters.find(
                    (e) => e.type === 'popularity',
                );

                if (popularityFilter) {
                    if (popularityFilter.value === 0) {
                        return b.units_sold - a.units_sold;
                    } else if (
                        popularityFilter.value === 1 &&
                        popularityFilter.active
                    ) {
                        return b.date - a.date;
                    }
                }
                return 0;
            });
    }, [products, activeFilters, searchVal]);

    const setProductFilter = (value: string | number) => {
        const mappedFilters = filters.map((p) => {
            if (p.label === value) {
                return { ...p, active: !p.active };
            }

            return p;
        });

        setFilters(mappedFilters);
    };

    const loadMore = () => {
        setLoadedProducts((prev) => prev + 12);
    };

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 items-start lg:grid-cols-[198px,1fr] lg:grid-rows-[auto,1fr]">
            <div className="lg:row-span-2 sticky top-0">
                <div className="grid grid-cols-1 gap-8 border border-appGray-300 p-8">
                    <div className="text-2xl leading-none font-bold tracking-[-2%]">
                        Filters
                    </div>
                    <div>
                        <div className="text-2xl leading-none tracking-[-2%] mb-5">
                            Gender
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filters
                                .filter((e) => e.type === 'gender')
                                .map((filter, index) => {
                                    return (
                                        <FormCheck
                                            key={index}
                                            value={filter.label as string}
                                            label={filter.label}
                                            onCheck={(value) =>
                                                setProductFilter(value)
                                            }
                                            checked={!filter.active}
                                            size="sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl leading-none tracking-[-2%] mb-5">
                            Price
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filters
                                .filter((e) => e.type === 'price')
                                .map((filter, index) => {
                                    return (
                                        <FormCheck
                                            key={index}
                                            value={filter.label as string}
                                            label={filter.label}
                                            onCheck={(value) =>
                                                setProductFilter(value)
                                            }
                                            checked={!filter.active}
                                            size="sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl leading-none tracking-[-2%] mb-5">
                            Popularity
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filters
                                .filter((e) => e.type === 'popularity')
                                .map((filter, index) => {
                                    return (
                                        <FormCheck
                                            key={index}
                                            value={filter.label as string}
                                            label={filter.label}
                                            onCheck={(value) =>
                                                setProductFilter(value)
                                            }
                                            checked={!filter.active}
                                            size="sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl leading-none tracking-[-2%] mb-5">
                            Categories
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filters
                                .filter((e) => e.type === 'category')
                                .map((filter, index) => {
                                    return (
                                        <FormCheck
                                            key={index}
                                            value={filter.label as string}
                                            label={filter.label}
                                            onCheck={(value) =>
                                                setProductFilter(value)
                                            }
                                            checked={!filter.active}
                                            size="sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl leading-none tracking-[-2%] mb-5">
                            Brands
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filters
                                .filter((e) => e.type === 'brand')
                                .map((filter, index) => {
                                    return (
                                        <FormCheck
                                            key={index}
                                            value={filter.label as string}
                                            label={filter.label}
                                            onCheck={(value) =>
                                                setProductFilter(value)
                                            }
                                            checked={!filter.active}
                                            size="sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-start-2">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                    <label className="flex items-center px-5 flex-1 border border-appGray-300">
                        <SearchIcon className="w-[18px] h-[18px]" />
                        <input
                            type="search"
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Search"
                            className="bg-transparent px-1.5 py-[15px] w-full text-lg leading-none tracking-[-2%] placeholder:text-appText focus:outline-none"
                        />
                    </label>
                    <button
                        className="flex items-center gap-1.5 p-[15px] transition-colors duration-300 text-appError bg-appError/10 hover:bg-appError/20"
                        onClick={clearFilters}
                    >
                        <TrashIcon className="w-[18px] h-[18px]" />
                        <span className="text-lg leading-none tracking-[-2%] mb-1">
                            Clear filters
                        </span>
                    </button>
                </div>
                <div
                    v-if="activeFilters.length > 0"
                    className="flex flex-wrap gap-4 mt-6"
                >
                    {activeFilters.map((filter, index) => {
                        return (
                            <button
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 border border-appGray-300 leading-none tracking-[-0.3px] text-appGray-500 transition-colors duration-300 hover:text-appGray-800"
                                onClick={() => setProductFilter(filter.label)}
                            >
                                <span className="mb-1">{filter.label}</span>
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                >
                                    <g id="cancel">
                                        <mask
                                            id="mask0_1616_67979"
                                            style={{
                                                maskType: 'alpha',
                                            }}
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="16"
                                            height="16"
                                        >
                                            <rect
                                                id="Bounding box"
                                                width="16"
                                                height="16"
                                                fill="#D9D9D9"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_1616_67979)">
                                            <path
                                                id="cancel_2"
                                                d="M5.59967 11.332L7.99967 8.93203L10.3997 11.332L11.333 10.3987L8.93301 7.9987L11.333 5.5987L10.3997 4.66536L7.99967 7.06536L5.59967 4.66536L4.66634 5.5987L7.06634 7.9987L4.66634 10.3987L5.59967 11.332ZM7.99967 14.6654C7.07745 14.6654 6.21079 14.4904 5.39967 14.1404C4.58856 13.7904 3.88301 13.3154 3.28301 12.7154C2.68301 12.1154 2.20801 11.4098 1.85801 10.5987C1.50801 9.78759 1.33301 8.92092 1.33301 7.9987C1.33301 7.07648 1.50801 6.20981 1.85801 5.3987C2.20801 4.58759 2.68301 3.88203 3.28301 3.28203C3.88301 2.68203 4.58856 2.20703 5.39967 1.85703C6.21079 1.50703 7.07745 1.33203 7.99967 1.33203C8.9219 1.33203 9.78856 1.50703 10.5997 1.85703C11.4108 2.20703 12.1163 2.68203 12.7163 3.28203C13.3163 3.88203 13.7913 4.58759 14.1413 5.3987C14.4913 6.20981 14.6663 7.07648 14.6663 7.9987C14.6663 8.92092 14.4913 9.78759 14.1413 10.5987C13.7913 11.4098 13.3163 12.1154 12.7163 12.7154C12.1163 13.3154 11.4108 13.7904 10.5997 14.1404C9.78856 14.4904 8.9219 14.6654 7.99967 14.6654Z"
                                                fill="#1C1B1F"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="lg:col-start-2">
                <div className="text-2xl leading-none tracking-[-2%] mb-6">
                    {filteredProducts.length} Product
                    {filteredProducts.length === 1 ? '' : 's'} found
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                card={product}
                                style={{
                                    display:
                                        index < loadedProducts ? '' : 'none',
                                }}
                                bcms={bcms}
                            />
                        );
                    })}
                </div>
                {loadedProducts < products.length && (
                    <button
                        className="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto mt-12 transition-colors duration-300 hover:bg-appText hover:text-white"
                        onClick={loadMore}
                    >
                        Load more
                    </button>
                )}
            </div>
        </div>
    );
};
