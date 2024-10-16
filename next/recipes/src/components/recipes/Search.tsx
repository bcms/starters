'use client';

import React, {
    useState,
    ChangeEvent,
    KeyboardEvent,
    useMemo,
    useRef,
} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import SearchIcon from '@/assets/icons/search.svg';
import { Transition } from 'react-transition-group';
import { RecipeLight } from '@/types';

interface Props {
    value?: string;
    recipes?: RecipeLight[];
    static?: boolean;
    size?: 'regular' | 'lg';
    showResults?: boolean;
    onInput?: (value: string) => void;
    onEnter?: (value: string) => void;
    className?: string;
}

const RecipesSearchBar: React.FC<Props> = ({
    value = '',
    recipes = [],
    static: isStatic = false,
    size = 'regular',
    showResults = true,
    onInput,
    onEnter,
    className = '',
}) => {
    const [searchValue, setSearchValue] = useState(value);
    const transitionRef = useRef(null);

    const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(target.value);
        if (onInput) onInput(target.value);
    };

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnter) onEnter(searchValue);
    };

    const filteredRecipes = useMemo(() => {
        return (
            recipes?.filter((e) => {
                return `${e.title} ${e.description}`
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            }) ?? []
        );
    }, [recipes, searchValue]);

    const placeholderSuggestion = useMemo(() => {
        const suggestions: string[] = [];

        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];

            const words = recipe.title.split(' ');

            if (
                words.some((e) =>
                    e.toLowerCase().startsWith(searchValue.toLowerCase()),
                )
            ) {
                suggestions.push(recipe.title.toLowerCase());
            }
        }

        if (suggestions[0]) {
            return suggestions[0].slice(
                suggestions[0].indexOf(searchValue.toLowerCase()),
            );
        }

        return '';
    }, [filteredRecipes, searchValue]);

    return (
        <div className={className}>
            <label
                className={classNames(
                    'flex items-center w-full bg-white rounded-lg px-4 border transition-colors duration-300 focus-within:border-appAccent',
                    {
                        'border-[#DEDEDE]': isStatic,
                        'border-transparent': !isStatic,
                        'lg:px-6': size === 'lg',
                    },
                )}
                style={{
                    filter: !isStatic
                        ? 'drop-shadow(0px 0px 8px rgba(10, 34, 19, 0.25))'
                        : '',
                }}
            >
                <SearchIcon
                    className={classNames('w-5 h-5', {
                        'lg:w-6 lg:h-6': size === 'lg',
                    })}
                />
                <div className="relative">
                    <input
                        value={searchValue.toLowerCase()}
                        placeholder="Search recipes"
                        className={classNames(
                            'px-1.5 py-3 bg-transparent text-sm leading-none font-medium tracking-[-0.41px] w-full placeholder:text-appGray-400 focus:outline-none',
                            {
                                'lg:px-2.5 lg:py-[18px] lg:text-base lg:leading-none':
                                    size === 'lg',
                            },
                        )}
                        onInput={handleInput}
                        onKeyUp={handleEnter}
                        onKeyDown={(e) => {
                            if (e.key === 'Tab' && placeholderSuggestion) {
                                e.preventDefault();
                                setSearchValue(
                                    `${searchValue}${placeholderSuggestion}`,
                                );
                            }
                        }}
                    />
                    {filteredRecipes.length > 0 &&
                        showResults &&
                        searchValue && (
                            <span className="absolute top-1/2 left-[7px] translate-y-[calc(-50%-1px)] text-sm leading-none font-medium tracking-[-0.41px] pointer-events-none">
                                <span className="opacity-0">
                                    {placeholderSuggestion.slice(
                                        0,
                                        searchValue.length,
                                    )}
                                </span>
                                <span className="text-appGray-400">
                                    {placeholderSuggestion.slice(
                                        searchValue.length,
                                    )}
                                </span>
                            </span>
                        )}
                </div>
            </label>

            <Transition
                appear={true}
                mountOnEnter={true}
                nodeRef={transitionRef}
                in={showResults}
                timeout={300}
            >
                {(state) => {
                    return (
                        <div
                            className={classNames(
                                'absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px bg-[#EBEBEB] border border-[#EBEBEB] rounded-lg overflow-hidden max-h-[200px] overflow-y-auto',
                                {
                                    hidden:
                                        !searchValue ||
                                        filteredRecipes.length === 0,
                                },
                                `fade-${state}`,
                            )}
                        >
                            {filteredRecipes.length > 0 ? (
                                filteredRecipes.map((recipe, index) => (
                                    <Link
                                        key={index}
                                        href={`/recipes/${recipe.slug}`}
                                        onClick={() => setSearchValue('')}
                                        className="flex bg-white px-4 py-3 text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 transition-colors duration-300 hover:text-appAccent"
                                    >
                                        {recipe.title}
                                    </Link>
                                ))
                            ) : (
                                <div className="flex bg-white px-4 py-3 text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500">
                                    There are no recipes for that search term
                                </div>
                            )}
                        </div>
                    );
                }}
            </Transition>
        </div>
    );
};

export default RecipesSearchBar;
