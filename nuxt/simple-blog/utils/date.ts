import type { PropValueDateData } from '@thebcms/types';

export const toReadableDate = (date: PropValueDateData) => {
    return new Date(date.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
