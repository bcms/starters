import React from 'react';
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
    return (
        <div>
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
