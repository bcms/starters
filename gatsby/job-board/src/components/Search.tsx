import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react';
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
import { ReactComponent as LocationIcon } from '@/assets/icons/location.svg';
import classNames from 'classnames';
interface SearchInputProps {
  value?: string;
  options: Array<{ title: string }>;
  placeholder?: string;
  icon?: any;
  onInput?: (value: string) => void;

  className?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  className,
  value = '',
  options,
  placeholder = 'Search',
  icon,
  onInput,
}) => {
  const [searchValue, setSearchValue] = useState<string>(value);
  const [filteredOptions, setFilteredOptions] = useState<
    Array<{ title: string }>
  >([]);
  const [placeholderSuggestion, setPlaceholderSuggestion] =
    useState<string>('');
  useEffect(() => {
    // Filter options based on searchValue
    const lowerSearchValue = searchValue.toLowerCase();
    const filtered = options.filter(
      (option) => option.title?.toLowerCase().includes(lowerSearchValue),
    );
    setFilteredOptions(filtered);

    // Calculate placeholder suggestion
    const suggestions: string[] = [];
    for (const recipe of filtered) {
      const words = recipe.title.split(' ');
      for (const word of words) {
        if (word.toLowerCase().startsWith(lowerSearchValue)) {
          suggestions.push(word.toLowerCase());
          break;
        }
      }
      if (suggestions.length > 0) break;
    }

    if (suggestions.length > 0) {
      const suggestion = suggestions[0];
      setPlaceholderSuggestion(
        suggestion.slice(lowerSearchValue.length, suggestion.length),
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
      placeholderSuggestion.length,
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
      {icon ? (
        <LocationIcon className="w-[14px] h-[14px] flex-shrink-0" />
      ) : (
        <SearchIcon className="w-[14px] h-[14px] flex-shrink-0" />
      )}
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

export default SearchInput;
