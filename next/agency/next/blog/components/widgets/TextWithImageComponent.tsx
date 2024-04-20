import { TextWithImageWidget } from '@/bcms/types';
import { ContentManager } from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';
import React, { FC, useMemo } from 'react';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';

interface Props {
  data: TextWithImageWidget;
}

export const TextWithImageComponent: FC<Props> = ({ data }) => {
  const hasText = useMemo(() => {
    const text = data.text as BCMSEntryContentParsedItem[];
    return text && text[0].value;
  }, []);

  return (
    <div
      className={`flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12 ${
        data?.image_position?.selected === 'LEFT'
          ? 'lg:flex-row-reverse'
          : 'lg:flex-row'
      }`}
    >
      {hasText && <ContentManager items={data.text || []} className="prose" />}
      <BCMSImage
        media={{ ...data.image, name: 'imag-1.jpg' }}
        className={`aspect-[2.07] rounded-lg overflow-hidden w-full cover flex-shrink-0 lg:rounded-2xl ${
          hasText
            ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
            : 'lg:aspect-[2.43]'
        }`}
      />
    </div>
  );
};
