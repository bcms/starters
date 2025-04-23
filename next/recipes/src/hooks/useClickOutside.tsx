import { useEffect, RefObject } from 'react';

interface ClickOutsideOptions {
    ref: RefObject<HTMLElement | null>;
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

            return;
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
