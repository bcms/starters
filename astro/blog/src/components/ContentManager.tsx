import React, { useRef, useEffect } from 'react';
import { BCMSContentManager } from '@thebcms/components-react';
import type { BCMSWidgetComponents } from '@thebcms/components-react';
import type { EntryContentParsedItem } from '@thebcms/types';
import TextWithImageWidgetComponent from './widgets/TextWithImageComponent';

interface Props {
    items: EntryContentParsedItem[];
    widgetComponents?: BCMSWidgetComponents;
    className?: string;
}

export const ContentManager: React.FC<Props> = ({
    items,
    widgetComponents,
    className,
}) => {
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
                            window.location.href = href;
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
    }, []);

    return (
        <div ref={managerDOM}>
            <BCMSContentManager
                className={className}
                items={items}
                widgetComponents={
                    widgetComponents || {
                        'text-with-image': TextWithImageWidgetComponent,
                    }
                }
            />
        </div>
    );
};
