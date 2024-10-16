'use client';

import React, { useRef, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    BCMSContentManager,
    BCMSWidgetComponents,
} from '@thebcms/components-react';
import { EntryContentParsedItem } from '@thebcms/types';
import TextWithImageWidget from './widgets/TextWithImageComponent';

interface ContentManagerProps {
    items: EntryContentParsedItem[];
    widgetComponents?: BCMSWidgetComponents;
    className?: string;
}

export const ContentManager: FC<ContentManagerProps> = ({
    items,
    widgetComponents,
    className,
}) => {
    const router = useRouter();
    const managerDOM = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parseInternalLinks = (): void => {
            if (managerDOM.current) {
                const links = managerDOM.current.querySelectorAll('a');
                links.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('/')) {
                        link.target = '_self';
                        const clickHandler = (event: Event): void => {
                            event.preventDefault();
                            void router.push(href);
                        };
                        link.addEventListener('click', clickHandler);

                        return () => {
                            link.removeEventListener('click', clickHandler);
                        };
                    }
                });
            }
        };

        parseInternalLinks();
    }, [router]);

    return (
        <div ref={managerDOM}>
            <BCMSContentManager
                className={className}
                items={items}
                widgetComponents={
                    widgetComponents || {
                        'text-with-image': TextWithImageWidget,
                    }
                }
            />
        </div>
    );
};
