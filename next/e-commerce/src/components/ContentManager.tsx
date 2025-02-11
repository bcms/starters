'use client';

import React, { useRef, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    BCMSContentManager,
    BCMSWidgetComponents,
} from '@thebcms/components-react';
import { EntryContentParsedItem } from '@thebcms/types';

interface Props {
    items: EntryContentParsedItem[];
    widgetComponents?: BCMSWidgetComponents;
    className?: string;
}

export const ContentManager: FC<Props> = ({
    items,
    widgetComponents,
    className,
}) => {
    const router = useRouter();
    const managerDOM = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parseInternalLinks = () => {
            if (managerDOM.current) {
                const links = managerDOM.current.querySelectorAll('a');
                links.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('/')) {
                        link.target = '_self';
                        const clickHandler = (event: Event) => {
                            event.preventDefault();
                            router.push(href);
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
                widgetComponents={widgetComponents}
            />
        </div>
    );
};
