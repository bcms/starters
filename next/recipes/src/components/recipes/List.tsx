'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import RecipesSearchBar from './Search';
import RecipesCard from './Card';
import { RecipeLight } from '@/types';
import { RecipesDropdown } from './Dropdown';
import { ClientConfig } from '@thebcms/client';
import { RecipesPagination } from './Pagination';

interface Props {
    recipes: RecipeLight[];
    bcmsConfig: ClientConfig;
}

const RecipesList: React.FC<Props> = ({ recipes, bcmsConfig }) => {
    const [searchValue, setSearchValue] = useState('');
    const [popularValue, setPopularValue] = useState('');
    const [categoriesValue, setCategoriesValue] = useState('');
    const recipesListDOM = useRef<HTMLDivElement | null>(null);
    const [paginationPage, setPaginationPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(8);

    useEffect(() => {
        if (recipesListDOM.current) {
            recipesListDOM.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [paginationPage]);

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setRecipesPerPage(recipesPerPage);
        }
    }, []);

    const popularOptions = useMemo(() => {
        return (
            recipes
                .filter((e) => e.popular)
                .reduce((acc, e) => {
                    if (!acc.includes(e.title)) {
                        acc.push(e.title);
                    }
                    return acc;
                }, [] as string[]) || []
        );
    }, [recipes]);

    const categoriesOptions = useMemo(() => {
        return (
            recipes.reduce((acc, e) => {
                e.categories.forEach((category) => {
                    if (!acc.includes(category || '')) {
                        acc.push(category || '');
                    }
                });
                return acc;
            }, [] as string[]) || []
        );
    }, [recipes]);

    const filteredRecipes = useMemo(() => {
        return (
            recipes.filter((e) => {
                let show = true;

                if (searchValue) {
                    show =
                        show &&
                        `${e.title} ${e.description}`
                            .toLowerCase()
                            .includes(searchValue.toLowerCase());
                }

                if (popularValue) {
                    show = show && !!e.popular && e.title === popularValue;
                }

                if (categoriesValue) {
                    show =
                        show &&
                        !!e.categories.find((i) => i === categoriesValue);
                }

                return show;
            }) || []
        );
    }, [searchValue, popularValue, categoriesValue, recipes]);

    const totalPaginationPages = useMemo(() => {
        return Math.ceil((filteredRecipes.length || 0) / recipesPerPage);
    }, [filteredRecipes, recipesPerPage]);

    const onPageChange = (num: number) => {
        setPaginationPage(num);
    };

    return (
        <div>
            <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] mb-8 max-w-[608px] mx-auto lg:gap-6 lg:mb-24">
                <RecipesSearchBar
                    value={searchValue}
                    static
                    size="lg"
                    showResults={false}
                    className="col-span-2"
                    onInput={(value) => setSearchValue(value)}
                />
                <RecipesDropdown
                    value={popularValue}
                    options={popularOptions}
                    placeholder="Popular"
                    onSelect={(value) => setPopularValue(value)}
                />
                <RecipesDropdown
                    value={categoriesValue}
                    options={categoriesOptions}
                    placeholder="Categories"
                    onSelect={(value) => setCategoriesValue(value)}
                />
            </div>
            {filteredRecipes.length > 0 ? (
                <div
                    ref={recipesListDOM}
                    className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16"
                >
                    {filteredRecipes
                        .slice(
                            (paginationPage - 1) * recipesPerPage,
                            (paginationPage - 1) * recipesPerPage +
                                recipesPerPage,
                        )
                        .map((recipe, index) => (
                            <RecipesCard
                                key={recipe.slug + index}
                                bcmsConfig={bcmsConfig}
                                card={recipe}
                            />
                        ))}
                </div>
            ) : (
                <div className="flex justify-center text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500">
                    There are no recipes for the applied filters
                </div>
            )}
            <RecipesPagination
                atPage={paginationPage}
                pageCount={totalPaginationPages}
                className="flex items-center justify-center gap-x-2 mt-6 lg:mt-10 lg:gap-x-4 xl:mt-[72px]"
                onPageChange={(value) => onPageChange(value)}
            />
        </div>
    );
};

export default RecipesList;
