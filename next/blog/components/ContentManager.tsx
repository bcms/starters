import React, { useRef, useEffect } from 'react';
import { BCMSContentManager } from 'next-plugin-bcms/components';
import { BCMSWidgetComponents } from 'next-plugin-bcms/components/content-manager';
import { useRouter } from 'next/router';

interface ContentManagerProps {
    item: any;
    widgetComponents?: BCMSWidgetComponents;
    className?: string;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ item, widgetComponents, className }) => {
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
                items={item}
                widgetComponents={widgetComponents as BCMSWidgetComponents}
            />
        </div>
    );
};

