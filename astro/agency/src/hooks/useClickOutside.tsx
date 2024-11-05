import { useEffect, type RefObject } from 'react';

interface ClickOutsideOptions {
    ref: RefObject<HTMLElement>;
    callback: () => void;
}

export const useClickOutside = ({
    callback,
    ref,
}: ClickOutsideOptions): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
