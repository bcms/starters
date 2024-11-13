import { bcms } from '@/bcms-client';
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

export async function generateMetadata(): Promise<Metadata> {
    const homePageEntry = (await bcms.entry.getBySlug(
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
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const foodItems = (await bcms.entry.getAll('food-item')) as FoodItemEntry[];

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                open_time={homePageMeta.hero_open_time}
                address={homePageMeta.hero_address}
                map={homePageMeta.hero_map_image}
                description={homePageMeta.description}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeMenu
                title={homePageMeta.menu_title}
                description={homePageMeta.menu_description}
                meals={homePageMeta.menu_meals}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeSeasons
                title={homePageMeta.seasons_title}
                description={homePageMeta.seasons_description}
                seasons={homePageMeta.seasons}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeAmbience
                title={homePageMeta.ambience_title}
                description={homePageMeta.ambience_description}
                items={homePageMeta.ambience_items}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeSpecials
                title={homePageMeta.specials_title}
                description={homePageMeta.specials_description}
                items={foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem)}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeEvents
                title={homePageMeta.events_title}
                description={homePageMeta.events_description}
                events={homePageMeta.events}
                bcmsConfig={bcms.getConfig()}
            />
            <HomeTestimonials
                title={homePageMeta.testimonials_title}
                description={homePageMeta.testimonials_description}
                testimonials={homePageMeta.testimonials}
                bcmsConfig={bcms.getConfig()}
            />
        </div>
    );
};

export default HomePage;
