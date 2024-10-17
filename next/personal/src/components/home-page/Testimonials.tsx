import { TestimonialEntryMetaItem } from '@bcms-types/types/ts';
import { PropRichTextDataParsed } from '@thebcms/types';
import ContentManager from '../ContentManager';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    items: TestimonialEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

const HomeTestimonials: React.FC<Props> = ({
    title,
    description,
    items,
    bcmsConfig,
}) => {
    return (
        <section className="pb-10 lg:pb-14">
            <div className="relative container">
                <div className="relative z-10 mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10">
                    <div className="flex items-center mb-[14px] md:mt-4">
                        <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1" />
                        <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
                            {title}
                        </h2>
                    </div>
                    <div className="md:max-w-[761px]">
                        <ContentManager
                            items={description.nodes}
                            className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 pb-6 border-b border-appGray-100 mb-6 lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8"
                        />
                        <div className="grid grid-cols-1 gap-6 lg:gap-8">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="pb-6 border-b border-appGray-100 lg:pb-8"
                                >
                                    <div className="flex items-center mb-[14px] lg:mb-6">
                                        <BCMSImage
                                            media={item.author_image}
                                            clientConfig={bcmsConfig}
                                            className="w-8 h-8 rounded-full overflow-hidden object-cover mr-2.5 lg:w-12 lg:h-12 lg:mr-4"
                                        />
                                        <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica lg:text-lg lg:leading-none">
                                            {item.title}
                                        </div>
                                    </div>
                                    <ContentManager
                                        items={item.content.nodes}
                                        className="text-sm lading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:leading-[1.4]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute top-[50%] -left-[10%] w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#FFBF4B] pointer-events-none max-md:hidden" />
                <div className="absolute top-[30%] left-0 w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#3A437E] pointer-events-none max-md:hidden" />
            </div>
        </section>
    );
};

export default HomeTestimonials;
