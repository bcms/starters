import ContentManager from '@/components/ContentManager';
import { ServiceEntry } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import React from 'react';

interface ListProps {
    items: ServiceEntry[];
    bcmsConfig: ClientConfig;
}

const List: React.FC<ListProps> = ({ items, bcmsConfig }) => {
    return (
        <section className="mb-8 md:mb-14 lg:mb-20 xl:mb-32">
            <div className="container">
                <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
                    {items.map(
                        (item, index) =>
                            item.meta.en && (
                                <div
                                    key={index}
                                    className={`grid min-h-[340px] rounded-2xl overflow-hidden lg:h-[518px] ${
                                        index % 2 === 0
                                            ? 'grid-cols-[37.5%,62.5%]'
                                            : 'grid-cols-[62.5%,37.5%] lg:grid-cols-[50.5%,49.5%]'
                                    }`}
                                    style={{
                                        boxShadow:
                                            '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                                    }}
                                >
                                    <div
                                        className={`${index % 2 === 0 ? '' : 'order-2'}`}
                                    >
                                        <BCMSImage
                                            media={item.meta.en.cover_image}
                                            clientConfig={bcmsConfig}
                                            className={`size-full object-cover`}
                                        />
                                    </div>
                                    <div
                                        className="flex flex-col justify-between text-appText-light p-4 pr-8 lg:p-8"
                                        style={{
                                            background: item.meta.en.theme,
                                        }}
                                    >
                                        <h2 className="text-sm font-bold leading-tight tracking-[-0.28px] max-w-[540px] mb-14 lg:text-2xl lg:leading-none lg:font-bold lg:tracking-[-0.64px] lg:mb-[200px]">
                                            {item.meta.en.title}
                                        </h2>
                                        <ContentManager
                                            items={
                                                item.meta.en.description.nodes
                                            }
                                            className="text-xs leading-tight tracking-[-0.24px] max-w-[90%] lg:text-base lg:leading-tight lg:tracking-[-0.32px]"
                                        />
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </div>
        </section>
    );
};

export default List;
