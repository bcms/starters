import React, { useRef, useEffect } from 'react';
import {BCMSContentManager} from "next-plugin-bcms/components";
import {BCMSWidgetComponents} from "next-plugin-bcms/components/content-manager";
import {useRouter} from "next/router";



export const ContentManager: React.FC<{item: any, widgetComponents?: BCMSWidgetComponents, className?: string}> = ({ item, widgetComponents, className}) => {
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
            items={item}
            widgetComponents={widgetComponents  as BCMSWidgetComponents}
        />
    );
}
