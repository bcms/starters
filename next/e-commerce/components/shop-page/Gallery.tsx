import { ProductColorEntry, ProductImageGroup } from '@/bcms/types';
import React, { useMemo, useState } from 'react';
import { BCMSImage } from 'next-plugin-bcms/components';
import classNames from 'classnames';

interface ShopGalleryProps {
  gallery: ProductImageGroup[];
  activeColor: ProductColorEntry;
}

export const ShopGallery: React.FC<ShopGalleryProps> = ({
  gallery,
  activeColor,
}) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const galleryByColor = useMemo(() => {
    return gallery.filter(
      (e) => e.color.meta.en?.slug === activeColor.meta.en?.slug,
    );
  }, [gallery, activeColor]);

  return (
    <div className="flex flex-col">
      {galleryByColor[activeImage] && (
        <BCMSImage
          media={galleryByColor[activeImage].image}
          options={{
            sizes: {
              exec: [
                {
                  width: 800,
                },
              ],
            },
          }}
          className="flex aspect-square w-full cover mb-6 flex-1"
        />
      )}
      <div className="flex gap-4 overflow-x-auto">
        {galleryByColor.map((image, index) => (
          <button
            key={index}
            className={classNames(
              'group flex flex-shrink-0 w-[124px] aspect-square border p-2 transition-colors duration-300',
              index === activeImage ? 'border-appText' : 'border-appGray-300',
            )}
            onClick={() => setActiveImage(index)}
          >
            <div className="overflow-hidden">
              <BCMSImage
                media={image.image}
                options={{
                  sizes: {
                    exec: [
                      {
                        width: 360,
                        height: 360,
                      },
                    ],
                  },
                }}
                className="w-full h-full cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
