import 'swiper/css';
import {
    ContactPageEntry,
    ContactPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import Btn from '@/components/Btn';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const contactPageEntry = (await bcmsPrivate.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    if (!contactPageEntry) {
        return notFound();
    }

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;
    const pageTitle = `${contactPageMeta.seo?.title || contactPageMeta.title} - Tastyyy`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const ContactPage: React.FC = async () => {
    const contactPageEntry = (await bcmsPrivate.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    if (!contactPageEntry) {
        return notFound();
    }

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    return (
        <div>
            <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
                <div className="container max-w-[1198px]">
                    <ArchWithStar />
                    <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0">
                        <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20">
                            {contactPageMeta.title}
                        </h1>
                        <ContentManager
                            items={contactPageMeta.description.nodes}
                            className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
                        />
                        <div className="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
                            <BCMSImage
                                media={contactPageMeta.map_image}
                                clientConfig={bcmsPublic.getConfig()}
                                className="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
                            />
                        </div>
                        <Btn
                            to="https://www.google.com/maps"
                            className="uppercase max-w-max mx-auto"
                        >
                            <span>Open maps</span>
                        </Btn>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
