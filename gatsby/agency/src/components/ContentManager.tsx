import React, { useEffect, useRef } from 'react';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { BCMSContentManager } from 'gatsby-source-bcms/components';
import { BCMSWidgetComponents } from 'gatsby-source-bcms/components/content-manager';
import { navigate } from 'gatsby';

interface Props {
  item: BCMSPropRichTextDataParsed;
  widgetComponents?: BCMSWidgetComponents;

  className?: string;
}

const ContentManager: React.FC<Props> = ({
  item,
  widgetComponents,
  className = {},
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

  useEffect(() => {
    parseInternalLinks();
  }, []);

  return (
    <div ref={managerDOM}>
      <BCMSContentManager
        className={className as string}
        items={item}
        widgetComponents={widgetComponents || {}}
      />
    </div>
  );
};

export default ContentManager;
