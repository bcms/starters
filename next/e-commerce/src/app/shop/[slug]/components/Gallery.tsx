'use client';

import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { ProductColorEntry, ProductImageGroup } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';

interface Props {
    gallery: ProductImageGroup[];
    activeColor: ProductColorEntry;
    bcms: ClientConfig;
}

export const Gallery: React.FC<Props> = ({ gallery, activeColor, bcms }) => {
    const [activeImage, setActiveImage] = useState(0);

    const galleryByColor = useMemo(() => {
        setActiveImage(0);
        return gallery.filter(
            (e) => e.color.meta.en?.slug === activeColor.meta.en?.slug,
        );
    }, [gallery, activeColor]);

    return (
        <div className="flex flex-col">
            {galleryByColor[activeImage] && (
                <BCMSImage
                    media={galleryByColor[activeImage].image}
                    clientConfig={bcms}
                    className="flex aspect-square w-full object-cover mb-6 flex-1"
                />
            )}
            <div className="flex gap-4 overflow-x-auto">
                {galleryByColor.map((image, index) => (
                    <button
                        key={index}
                        className={classNames(
                            'group flex flex-shrink-0 w-[124px] aspect-square border p-2 transition-colors duration-300',
                            index === activeImage
                                ? 'border-appText'
                                : 'border-appGray-300',
                        )}
                        onClick={() => setActiveImage(index)}
                    >
                        <div className="overflow-hidden">
                            <BCMSImage
                                media={image.image}
                                clientConfig={bcms}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
