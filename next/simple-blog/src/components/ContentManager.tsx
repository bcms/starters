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
}

const ContentManager: React.FC<Props> = ({
    items,
    widgetComponents,
    className = '',
}) => {
    const managerDOM = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!managerDOM.current) {
            return;
        }
        const links = managerDOM.current.querySelectorAll('a');
        const unsubs: Array<() => void> = [];
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
                link.target = '_self';
                const clickHandler = (event: Event): void => {
                    event.preventDefault();
                    void router.push(href);
                };
                link.addEventListener('click', clickHandler);
                unsubs.push(() => {
                    link.removeEventListener('click', clickHandler);
                });
            }
        }
        return () => {
            unsubs.forEach((unsub) => unsub());
        };
    }, [router]);

    return (
        <div ref={managerDOM}>
            <BCMSContentManager
                className={className}
                items={items}
                widgetComponents={widgetComponents || {}}
            />
        </div>
    );
};

export default ContentManager;
