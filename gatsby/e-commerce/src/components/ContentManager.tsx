import React, { useEffect, useRef } from 'react';
import {
    BCMSContentManager,
    BCMSWidgetComponents,
} from '@thebcms/components-react';
import { EntryContentParsedItem } from '@thebcms/types';
import { navigate } from '@reach/router';

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
    const parseInternalLinks = (): void => {
        if (managerDOM.current) {
            const links = managerDOM.current.querySelectorAll('a');
            links.forEach((link: HTMLAnchorElement) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('/')) {
                    link.target = '_self';
                    const clickHandler = (event: Event): void => {
                        event.preventDefault();
                        navigate(href);
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
        <div ref={managerDOM}>
            <BCMSContentManager
                className={className}
                items={items}
                widgetComponents={widgetComponents}
            />
        </div>
    );
};

export default ContentManager;
