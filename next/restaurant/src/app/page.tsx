import HomeHero from '@/components/home-page/Hero';
import HomeMenu from '@/components/home-page/Menu';
import HomeSeasons from '@/components/home-page/Seasons';
import HomeAmbience from '@/components/home-page/Ambience';
import HomeSpecials from '@/components/home-page/Specials';
import HomeEvents from '@/components/home-page/Events';
import HomeTestimonials from '@/components/home-page/Testimonials';
import 'swiper/css';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const pageTitle = `${homePageMeta.seo?.title || homePageMeta.title} - Tastyyy`;

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

const HomePage: React.FC = async () => {
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const foodItems = (await bcmsPrivate.entry.getAll(
        'food-item',
    )) as FoodItemEntry[];

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                open_time={homePageMeta.hero_open_time}
                address={homePageMeta.hero_address}
                map={homePageMeta.hero_map_image}
                description={homePageMeta.description}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeMenu
                title={homePageMeta.menu_title}
                description={homePageMeta.menu_description}
                meals={homePageMeta.menu_meals}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeSeasons
                title={homePageMeta.seasons_title}
                description={homePageMeta.seasons_description}
                seasons={homePageMeta.seasons}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeAmbience
                title={homePageMeta.ambience_title}
                description={homePageMeta.ambience_description}
                items={homePageMeta.ambience_items}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeSpecials
                title={homePageMeta.specials_title}
                description={homePageMeta.specials_description}
                items={foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem)}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeEvents
                title={homePageMeta.events_title}
                description={homePageMeta.events_description}
                events={homePageMeta.events}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeTestimonials
                title={homePageMeta.testimonials_title}
                description={homePageMeta.testimonials_description}
                testimonials={homePageMeta.testimonials}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default HomePage;
