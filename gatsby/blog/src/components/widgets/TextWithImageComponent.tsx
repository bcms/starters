import { BCMSImage } from '@thebcms/components-react';
import React, { FC, useMemo } from 'react';
import { TextWithImageWidget as TextWithImageWidgetType } from '../../../bcms/types/ts';
import ContentManager from '../ContentManager';
import { bcmsPublic } from '../../../bcms-public';

interface Props {
    data: TextWithImageWidgetType;
}

const TextWithImageWidget: FC<Props> = ({ data }) => {
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
            {hasText && (
                <ContentManager
                    items={data.text?.nodes || []}
                    className="prose"
                />
            )}
            {data.image && (
                <div
                    className={`aspect-[2.07] rounded-lg overflow-hidden w-full flex-shrink-0 lg:rounded-2xl ${
                        hasText
                            ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
                            : 'lg:aspect-[2.43]'
                    }`}
                >
                    <BCMSImage
                        media={data.image}
                        clientConfig={bcmsPublic.getConfig()}
                        className={`size-full object-cover`}
                    />
                </div>
            )}
        </div>
    );
};

export default TextWithImageWidget;
