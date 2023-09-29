import { useEffect, useRef } from 'react';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { BCMSContentManager } from 'next-plugin-bcms/components';
import { BCMSWidgetComponents } from 'next-plugin-bcms/components/content-manager';
import { useRouter } from 'next/router';

interface Props {
  item: BCMSPropRichTextDataParsed;
  widgetComponents?: BCMSWidgetComponents;

  className?: string;

  parentClassName?: string;
}

const ContentManager: React.FC<Props> = ({
  item,
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
        items={item}
        widgetComponents={widgetComponents || {}}
      />
    </div>
  );
};

export default ContentManager;
