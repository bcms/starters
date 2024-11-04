import { BCMSImage } from '@thebcms/components-react';
import { useState } from 'react';
import type { TestimonialEntryMetaItem } from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';

interface Props {
    items: TestimonialEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

const Items: React.FC<Props> = ({ items, bcmsConfig }) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const activeItem = items[activeItemIndex];

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-[856px] mx-auto lg:gap-6 lg:mb-[170px]">
                {items.map((item, index) => (
                    <button
                        key={index}
                        className="flex"
                        onClick={() => setActiveItemIndex(index)}
                    >
                        <BCMSImage
                            media={item.author_image}
                            clientConfig={bcmsConfig}
                            className={`size-10 rounded-full overflow-hidden object-cover transition-all duration-300 lg:w-16 lg:h-16 ${
                                activeItemIndex === index
                                    ? 'scale-125'
                                    : 'opacity-20'
                            }`}
                        />
                    </button>
                ))}
            </div>
            <div className="flex flex-col items-center text-center max-w-[1194px] mx-auto mb-6 lg:mb-12">
                <h3 className="text-xl leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px] lg:mb-10">
                    {activeItem?.title}
                </h3>
                <ContentManager
                    items={activeItem?.content.nodes || []}
                    className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-500 lg:text-[32px]"
                />
            </div>
            <div className="flex items-center gap-2 lg:gap-6">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`relative h-0.5 transition-all duration-300 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-full after:h-5 lg:h-1 ${
                            activeItemIndex === index
                                ? 'flex-[3] bg-[#2B261E]'
                                : 'flex-1 bg-[#F0F0F0]'
                        }`}
                        onClick={() => setActiveItemIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Items;
