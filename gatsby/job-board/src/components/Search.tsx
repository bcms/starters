import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import SearchIcon from '../assets/icons/search.inline.svg';
import classNames from 'classnames';

interface Props {
    value?: string;
    options: Array<{ title: string }>;
    placeholder?: string;
    icon?: () => JSX.Element;
    onInput?: (value: string) => void;
    className?: string;
}

const Search: React.FC<Props> = ({
    className,
    value = '',
    options,
    placeholder = 'Search',
    icon: icon = () => (
        <SearchIcon className="w-[14px] h-[14px] flex-shrink-0" />
    ),
    onInput,
}) => {
    const [searchValue, setSearchValue] = useState(value);
    const [filteredOptions, setFilteredOptions] = useState<
        Array<{ title: string }>
    >([]);
    const [placeholderSuggestion, setPlaceholderSuggestion] = useState('');

    useEffect(() => {
        // Filter options based on searchValue
        const lowerSearchValue = searchValue.toLowerCase();
        const filtered = options.filter((option) =>
            option.title.toLowerCase().includes(lowerSearchValue),
        );
        setFilteredOptions(filtered);

        // Calculate placeholder suggestion
        const suggestions: string[] = [];
        for (const job of filtered) {
            const words = job.title.split(' ');
            if (
                words.some((e) => e.toLowerCase().startsWith(lowerSearchValue))
            ) {
                suggestions.push(job.title.toLowerCase());
            }
        }

        if (suggestions.length > 0) {
            const suggestion = suggestions[0];
            setPlaceholderSuggestion(
                suggestion.slice(suggestion.indexOf(lowerSearchValue)),
            );
        } else {
            setPlaceholderSuggestion('');
        }

        // Invoke onInput callback
        if (onInput) {
            onInput(searchValue);
        }
    }, [searchValue, options, onInput]);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleTabPress = (event: KeyboardEvent<HTMLInputElement>) => {
        const placeholderValue = placeholderSuggestion.slice(
            searchValue.length,
        );
        if (
            event.key === 'Tab' &&
            placeholderValue &&
            placeholderValue.length > 0
        ) {
            setSearchValue(`${searchValue}${placeholderValue}`);
        }
    };

    return (
        <label
            className={classNames(
                'relative flex items-center border-b border-appGray-400 w-full overflow-hidden',
                className,
            )}
        >
            {icon()}
            <input
                value={searchValue.toLowerCase()}
                type="text"
                placeholder={placeholder}
                className="bg-transparent px-1.5 py-[17px] flex-1 w-full text-sm leading-none font-medium tracking-[-0.41px] placeholder:text-appGray-500 focus:outline-none"
                onChange={handleInput}
                onKeyDown={handleTabPress}
            />
            {filteredOptions.length > 0 && searchValue && (
                <span className="absolute top-1/2 left-[21px] -translate-y-1/2 truncate text-sm leading-none font-medium tracking-[-0.41px] pointer-events-none">
                    <span className="opacity-0">
                        {placeholderSuggestion.slice(0, searchValue.length)}
                    </span>
                    <span className="text-appGray-400">
                        {placeholderSuggestion.slice(searchValue.length)}
                    </span>
                </span>
            )}
        </label>
    );
};

export default Search;
