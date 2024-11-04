import { bcms } from '../../bcms-client';
import { ContentManager } from '../ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import './text-with-image.css';
import { type FC, useMemo } from 'react';
import type { TextWithImageWidget } from '../../../bcms/types/ts';

interface Props {
    data: TextWithImageWidget;
}

const TextWithImageWidgetComponent: FC<Props> = ({ data }) => {
    const hasText = useMemo(() => {
        return data.text?.nodes.length ?? 0;
    }, []);

    return (
        <div
            className={`flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12 ${
                data?.image_alignment === 'LEFT'
                    ? 'lg:flex-row-reverse'
                    : 'lg:flex-row'
            }`}
        >
            {hasText ? (
                <ContentManager
                    items={data.text?.nodes || []}
                    className="prose"
                />
            ) : null}
            {data.image ? (
                <div
                    className={`aspect-[2.07] rounded-lg overflow-hidden w-full flex-shrink-0 lg:rounded-2xl ${
                        hasText
                            ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
                            : 'lg:aspect-[2.43]'
                    }`}
                >
                    <BCMSImage
                        media={data.image}
                        clientConfig={bcms.getConfig()}
                        className={`size-full object-cover`}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default TextWithImageWidgetComponent;
