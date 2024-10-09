import { bcms } from '@/bcms-client';
import HomePageAboutUs from '@/components/home-page/AboutUs';
import HomePageHero from '@/components/home-page/Hero';
import HomePageLetsTalk from '@/components/home-page/LetsTalk';
import HomePageRecipes from '@/components/home-page/Recipes';
import { recipeToLight } from '@/utils/recipe';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    RecipeEntry,
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
    const pageTitle = `${homePageMeta.seo?.title || homePageMeta.title} - Flavour Fushion`;

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

    const recipeEntries = (await bcms.entry.getAll('recipe')) as RecipeEntry[];

    const lightRecipes = recipeEntries.map((e) => {
        return recipeToLight(e);
    });

    return (
        <div>
            <HomePageHero
                headline={homePageMeta.headline}
                description={homePageMeta.description}
                coverImage={homePageMeta.cover_image}
                recipes={lightRecipes}
            />
            <HomePageRecipes
                bcmsConfig={bcms.getConfig()}
                title={homePageMeta.recipes_title}
                recipes={homePageMeta.recipes}
            />
            <HomePageAboutUs data={homePageMeta.about_us} />
            <HomePageLetsTalk
                title={homePageMeta.contact_title}
                description={homePageMeta.contact_description}
                phone={homePageMeta.contact_phone}
                email={homePageMeta.contact_email}
            />
        </div>
    );
};

export default HomePage;
