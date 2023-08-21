import React, { useRef, useEffect } from 'react';
import {BCMSContentManager, BCMSWidgetComponents} from "~/bcms-components";
import {useRouter} from "next/router";

export function ContentManager ({ item, widgetComponents, className}: {item: any, widgetComponents?: BCMSWidgetComponents, className?: string}) : JSX.Element {
    const router = useRouter()
    const managerDOM = useRef<HTMLAnchorElement>(null);
    function parseInternalLinks (): void {
        if (managerDOM.current) {
            const links = managerDOM?.current?.querySelectorAll('a');

            links.forEach((link ) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('/')) {
                    link.target = '_self';
                    link.addEventListener('click', event => {
                        event.preventDefault();
                       void router.push(href)
                    });
                }
            });
        }
    }

    useEffect(() => {
        parseInternalLinks();
    }, []);

    return (
        <BCMSContentManager
            className={className}
            ref={managerDOM}
            items={item}
            widgetComponents={widgetComponents as BCMSWidgetComponents}
        />
    );
}
