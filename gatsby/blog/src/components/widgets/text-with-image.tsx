import { BCMSImage } from 'gatsby-source-bcms/components';
import React, { FC, useMemo } from 'react';
import { ContentManager } from '../content-manager';
import { TextWithImageWidget as TextWithImageWidgetType } from '../../../bcms/types';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';

interface Props {
  data: string;
}

export const TextWithImageWidget: FC<Props> = ({ data }) => {
  const parsedData: TextWithImageWidgetType = JSON.parse(data);

  const hasText = useMemo(() => {
    const text = parsedData.text as BCMSEntryContentParsedItem[];
    return text && text[0].value;
  }, []);

  return (
    <div
      className={`flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12 ${
        parsedData?.image_position?.selected === 'LEFT'
          ? 'lg:flex-row-reverse'
          : 'lg:flex-row'
      }`}
    >
      <ContentManager items={parsedData.text || []} className="prose" />
      <BCMSImage
        media={parsedData.image}
        className={`aspect-[2.07] rounded-lg overflow-hidden w-full cover flex-shrink-0 lg:rounded-2xl ${
          hasText
            ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
            : 'lg:aspect-[2.43]'
        }`}
      />
    </div>
  );
};

export default TextWithImageWidget;
