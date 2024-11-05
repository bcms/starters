import { SwiperSlide, Swiper } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { BCMSImage } from '@thebcms/components-react';
import './speakers.css';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { SpeakerGroup } from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    cover: PropMediaDataParsed;
    speakers: SpeakerGroup[];
    bcmsConfig: ClientConfig;
}

SwiperCore.use([A11y, Pagination]);

const sliderOptions = {
    slidesPerView: 1,
    watchOverflow: true,
    grabCursor: true,
    spaceBetween: 20,
    pagination: {
        el: '.homeSpeakers--pagination',
        clickable: true,
    },
};

const HomeSpeakers: React.FC<Props> = ({
    title,
    description,
    cover,
    speakers,
    bcmsConfig,
}) => {
    return (
        <section className="pb-16 lg:pb-[136px]">
            <div className="container">
                <div className="px-4 mb-[14px] lg:px-16 lg:mb-12">
                    <div className="relative aspect-[1.6] lg:aspect-[1.67]">
                        <BCMSImage
                            media={cover}
                            clientConfig={bcmsConfig}
                            className="relative z-10 size-full object-cover"
                        />
                        <div className="absolute -top-4 -left-4 w-[163px] aspect-square bg-[#7EE984] lg:w-[672px] lg:-top-16 lg:-left-16" />
                        <div className="absolute bottom-0 -right-4 w-[163px] aspect-square bg-appAccent lg:w-[672px] lg:-right-16" />
                    </div>
                </div>
                <div className="px-4 lg:px-16">
                    <div className="leading-none tracking-[-0.02em] font-semibold mb-3 lg:text-5xl lg:leading-none lg:mb-6">
                        {title}
                    </div>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.4] font-medium tracking-[-0.8px] text-appGray-500 mb-6 lg:text-[26px] lg:leading-[1.4] lg:mb-[88px]"
                    />
                    <Swiper {...sliderOptions} className="mb-8 lg:mb-16">
                        {speakers &&
                            speakers.map((speaker, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center mb-5 lg:mb-14">
                                        <BCMSImage
                                            media={speaker.avatar_image}
                                            clientConfig={bcmsConfig}
                                            className="w-8 h-8 object-cover rounded-full overflow-hidden mr-3 lg:w-24 lg:h-24 lg:mr-6"
                                        />
                                        <div>
                                            <div className="text-sm leading-none tracking-[-0.04em] font-medium mb-1.5 lg:text-[32px] lg:leading-none lg:mb-[14px]">
                                                {speaker.name}
                                            </div>
                                            <div className="text-xs leading-none tracking-[-0.05em] font-medium text-appGray-500 lg:text-2xl lg:leading-none">
                                                {speaker.role}
                                            </div>
                                        </div>
                                    </div>
                                    <ContentManager
                                        items={speaker.biography.nodes}
                                        className="homeSpeakers--rt mb-4 lg:mb-12"
                                    />
                                    <ContentManager
                                        items={speaker.topic.nodes}
                                        className="homeSpeakers--rt"
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    <div className="homeSpeakers--pagination swiper--customPagination" />
                </div>
            </div>
        </section>
    );
};

export default HomeSpeakers;
