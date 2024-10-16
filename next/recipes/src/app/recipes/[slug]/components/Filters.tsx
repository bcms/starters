'use client';

import React, { useEffect, useState } from 'react';
import RecipesSearchBar from '@/components/recipes/Search';
import { RecipesDropdown } from '@/components/recipes/Dropdown';
import { useRouter } from 'next/navigation';

interface Props {
    popular: string[];
    categories: string[];
}

const Filters: React.FC<Props> = ({ popular, categories }) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [popularValue, setPopularValue] = useState('');
    const [categoriesValue, setCategoriesValue] = useState('');

    const filterRedirect = (key: string, val: string) => {
        if (val) {
            void router.push(`/recipes/?${key}=${val}`);
        }
    };

    useEffect(() => {
        if (searchValue) {
            filterRedirect('s', searchValue);
        }

        if (popularValue) {
            filterRedirect('p', popularValue);
        }

        if (categoriesValue) {
            filterRedirect('c', categoriesValue);
        }
    }, [searchValue, popularValue, categoriesValue]);

    return (
        <div className="pt-24 mb-8 md:pt-6 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:mb-14">
            <div className="container">
                <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] lg:grid-cols-4 lg:gap-x-4">
                    <RecipesSearchBar
                        static
                        size="lg"
                        className="col-span-2"
                        onEnter={(value) => setSearchValue(value)}
                    />
                    <RecipesDropdown
                        value={popularValue}
                        options={popular}
                        placeholder="Popular"
                        dropdownPosition="left"
                        onSelect={(value) => setPopularValue(value)}
                    />
                    <RecipesDropdown
                        value={categoriesValue}
                        options={categories}
                        placeholder="Categories"
                        dropdownPosition="left"
                        onSelect={(value) => setCategoriesValue(value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filters;
