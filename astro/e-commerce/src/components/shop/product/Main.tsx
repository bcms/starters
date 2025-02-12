import React, { useState } from 'react';
import type {
    ProductColorEntry,
    ProductEntryMetaItem,
} from '../../../../bcms/types/ts';
import type { ProductLite } from '../../../utils/product';
import type { ClientConfig } from '@thebcms/client';
import { ProductCard } from '../../ProductCard';
import { Gallery } from './Gallery';
import { Details } from './Details';

interface Props {
    meta: ProductEntryMetaItem;
    otherProducts: ProductLite[];
    bcms: ClientConfig;
}

export const Main: React.FC<Props> = ({ meta, otherProducts, bcms }) => {
    const [activeColor, setActiveColor] = useState<ProductColorEntry>(
        meta.gallery[0].color,
    );

    return (
        <div>
            {activeColor && (
                <div className="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2">
                    <Gallery
                        gallery={meta.gallery}
                        activeColor={activeColor}
                        bcms={bcms}
                    />
                    <Details
                        meta={meta}
                        activeColor={activeColor}
                        colorChange={(c) => setActiveColor(c)}
                    />
                </div>
            )}
            {otherProducts.length > 0 && (
                <div>
                    <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-8 lg:text-[24px] lg:flex-row">
                        <div>Others you may like</div>
                        <a href="/shop" className="underline">
                            {' '}
                            See all{' '}
                        </a>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {otherProducts.map((product, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    card={product}
                                    bcms={bcms}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
