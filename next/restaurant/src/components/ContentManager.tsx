'use client';

import { useEffect, useRef } from 'react';
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
    parentClassName?: string;
}

const ContentManager: React.FC<Props> = ({
    items,
    widgetComponents,
    className = '',
    parentClassName = '',
}) => {
    const managerDOM = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const parseInternalLinks = (): void => {
        if (managerDOM.current) {
            const links = managerDOM.current.querySelectorAll('a');
            links.forEach((link: HTMLAnchorElement) => {
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

    useEffect(() => {
        parseInternalLinks();
    }, []);

    return (
        <div ref={managerDOM} className={parentClassName}>
            <BCMSContentManager
                className={className as string}
                items={items}
                widgetComponents={widgetComponents || {}}
            />
        </div>
    );
};

export default ContentManager;
