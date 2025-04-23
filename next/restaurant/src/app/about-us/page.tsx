import 'swiper/css';
import { AboutPageEntry, AboutPageEntryMetaItem } from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutHero from '@/components/about-page/Hero';
import AboutTextImage from '@/components/about-page/TextImage';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const aboutPageEntry = (await bcmsPrivate.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    if (!aboutPageEntry) {
        return notFound();
    }

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;
    const pageTitle = `${aboutPageMeta.seo?.title || aboutPageMeta.title} - Tastyyy`;

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

const AboutUsPage: React.FC = async () => {
    const aboutPageEntry = (await bcmsPrivate.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    if (!aboutPageEntry) {
        return notFound();
    }

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    return (
        <div>
            <AboutHero
                title={aboutPageMeta.hero_title}
                subtitle={aboutPageMeta.hero_subtitle}
                description={aboutPageMeta.hero_description}
                cover={aboutPageMeta.hero_cover}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <AboutTextImage
                data={aboutPageMeta.text_image_cols}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default AboutUsPage;
