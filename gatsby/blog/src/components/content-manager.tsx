import React, { useRef, useEffect, FC } from 'react';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { BCMSContentManager } from 'gatsby-source-bcms/components';
import { navigate } from 'gatsby';
import { BCMSWidgetComponents } from 'gatsby-source-bcms/components/content-manager';
import { TextWithImageWidget } from './widgets';

interface ContentManagerProps {
  items: BCMSPropRichTextDataParsed;
  widgetComponents?: BCMSWidgetComponents;
  className?: string;
}

export const ContentManager: FC<ContentManagerProps> = ({
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
              void navigate(href);
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
    <div ref={managerDOM} className={className}>
      <BCMSContentManager
        items={items}
        widgetComponents={
          widgetComponents || {
            text_with_image: TextWithImageWidget,
          }
        }
      />
    </div>
  );
};
