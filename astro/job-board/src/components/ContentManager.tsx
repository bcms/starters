import {
    BCMSContentManager,
    type BCMSWidgetComponents,
} from '@thebcms/components-react';
import type { EntryContentParsedItem } from '@thebcms/types';

interface Props {
    items: EntryContentParsedItem[];
    widgetComponents?: BCMSWidgetComponents;
    className?: string;
}

const ContentManager: React.FC<Props> = ({
    items,
    widgetComponents,
    className = {},
}) => {
    return (
        <div>
            <BCMSContentManager
                className={className as string}
                items={items}
                widgetComponents={widgetComponents || {}}
            />
        </div>
    );
};

export default ContentManager;
