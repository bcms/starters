import ContentManager from '../ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import DribbleIcon from '../../assets/icons/dribble.svg?raw';
import LinkedInIcon from '../../assets/icons/linkedin.svg?raw';
import TwitterXIcon from '../../assets/icons/twitter-x.svg?raw';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    image: PropMediaDataParsed;
    bcmsConfig: ClientConfig;
}

const HomeHero: React.FC<Props> = ({
    title,
    description,
    image,
    bcmsConfig,
}) => {
    const socials = [
        {
            label: 'Dribble',
            icon: DribbleIcon,
            href: 'https://dribbble.com/',
        },
        {
            label: 'LinkedIn',
            icon: LinkedInIcon,
            href: 'https://www.linkedin.com/',
        },
        {
            label: 'Twitter',
            icon: TwitterXIcon,
            href: 'https://www.xcom/',
        },
    ];

    return (
        <section className="py-10 lg:pb-14">
            <div className="container">
                <div className="grid grid-cols-1 gap-4 auto-rows-fr md:grid-cols-[2fr,3fr] lg:grid-cols-[500px,1fr] xl:grid-cols-[615px,1fr]">
                    <div className="relative bg-[#FAFAFA] rounded-3xl p-6 overflow-hidden xl:p-10">
                        <div className="relative z-10 h-full flex flex-col items-start">
                            <h1 className="leading-[1.2] tracking-[-0.41px] mb-2.5 lg:text-[34px] lg:leading-[1.2] lg:mb-4">
                                {title}
                            </h1>
                            <ContentManager
                                items={description.nodes}
                                className="text-xs leading-[1.4] tracking-[-0.41px] text-appGray-400 pr-[70px] mb-8 lg:text-base lg:leading-[1.4] lg:mb-8"
                            />
                            <a
                                href="/contact"
                                className="flex px-[18px] py-[14px] rounded-[32px] border border-appGray-200 text-xs leading-none tracking-[-0.41px] font-medium text-appGray-500 uppercase mb-14 lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
                            >
                                Contact me
                            </a>
                            <ul className="flex items-center gap-3 mt-auto lg:gap-5">
                                {socials.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.icon,
                                                }}
                                                className="w-4 h-4 mr-1.5"
                                            />
                                            <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                                                {item.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="absolute top-0 right-0 w-[244px] h-[244px] translate-x-1/2 -translate-y-1/2 bg-[#3A437E] bg-blend-overlay rounded-full opacity-50 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-[244px] h-[244px] -translate-x-1/2 translate-y-1/2 bg-[#FFBF4B] bg-blend-overlay rounded-full opacity-50 blur-[100px] xl:-translate-y-1/3" />
                    </div>
                    <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-auto xl:aspect-[1.3]">
                        <BCMSImage
                            media={image}
                            clientConfig={bcmsConfig}
                            className="size-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
