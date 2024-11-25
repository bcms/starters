import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    ContactPageEntry,
    ContactPageEntryMetaItem,
    EventsPageEntry,
    EventsPageEntryMetaItem,
    FoodItemEntry,
    FoodItemEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalPageEntry,
    MealTypeEntry,
    MealTypeEntryMetaItem,
    MenuPageEntry,
    MenuPageEntryMetaItem,
    ReservationPageEntry,
    ReservationPageEntryMetaItem,
    SeasonEntry,
    SeasonEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    AboutUsPageContent,
    ContactPageContent,
    EventsPageContent,
    HomePageContent,
    LegalPageContent,
    MenuPageContent,
    ReservationPageContent,
    SeasonalMenuPageContent,
} from './src/types';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const foodItems = (await bcms.entry.getAll('food-item')) as FoodItemEntry[];

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            foodItems,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // SEASONAL MENU
    const seasonalMenuTemplate = path.resolve(
        './src/templates/seasonal-menu.tsx',
    );
    const seasons = ((await bcms.entry.getAll('season')) as SeasonEntry[]).map(
        (e) => e.meta.en as SeasonEntryMetaItem,
    );

    createPage({
        path: `/seasonal-menu`,
        component: seasonalMenuTemplate,
        context: {
            seasons,
            foodItems: foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem),
            bcms: bcms.getConfig(),
        } as SeasonalMenuPageContent,
    });

    // RESERVATION
    const reservationTemplate = path.resolve('./src/templates/reservation.tsx');
    const reservationPage = (await bcms.entry.getBySlug(
        'reservation',
        'reservation-page',
    )) as ReservationPageEntry;

    const reservationPageMeta = reservationPage.meta
        .en as ReservationPageEntryMetaItem;

    createPage({
        path: `/reservation`,
        component: reservationTemplate,
        context: {
            meta: reservationPageMeta,
            bcms: bcms.getConfig(),
        } as ReservationPageContent,
    });

    // MENU
    const menuTemplate = path.resolve('./src/templates/menu.tsx');
    const menuPageEntry = (await bcms.entry.getBySlug(
        'menu',
        'menu-page',
    )) as MenuPageEntry;

    const menuPageMeta = menuPageEntry.meta.en as MenuPageEntryMetaItem;
    const mealTypes = (
        (await bcms.entry.getAll('meal-type')) as MealTypeEntry[]
    ).map((e) => e.meta.en as MealTypeEntryMetaItem);

    createPage({
        path: `/menu`,
        component: menuTemplate,
        context: {
            meta: menuPageMeta,
            foodItems: foodItems.map((e) => e.meta.en as FoodItemEntryMetaItem),
            mealTypes,
            bcms: bcms.getConfig(),
        } as MenuPageContent,
    });

    // LEGAL
    const legalTemplate = path.resolve('./src/templates/legal.tsx');
    const legalEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];

    createPage({
        path: '/legal',
        component: legalTemplate,
        context: {
            entries: legalEntries,
            bcms: bcms.getConfig(),
        } as LegalPageContent,
    });

    // EVENTS
    const eventsTemplate = path.resolve('./src/templates/events.tsx');
    const eventsPageEntry = (await bcms.entry.getBySlug(
        'events',
        'events-page',
    )) as EventsPageEntry;

    const eventsPageMeta = eventsPageEntry.meta.en as EventsPageEntryMetaItem;

    createPage({
        path: '/events',
        component: eventsTemplate,
        context: {
            meta: eventsPageMeta,
            bcms: bcms.getConfig(),
        } as EventsPageContent,
    });

    // CONTACT
    const contactTemplate = path.resolve('./src/templates/contact.tsx');
    const contactPageEntry = (await bcms.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;
    createPage({
        path: '/contact',
        component: contactTemplate,
        context: {
            meta: contactPageMeta,
            bcms: bcms.getConfig(),
        } as ContactPageContent,
    });

    // ABOUT US
    const aboutUsTemplate = path.resolve('./src/templates/about-us.tsx');
    const aboutUsPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutUsPageMeta = aboutUsPageEntry.meta.en as AboutPageEntryMetaItem;

    createPage({
        path: '/about-us',
        component: aboutUsTemplate,
        context: {
            meta: aboutUsPageMeta,
            bcms: bcms.getConfig(),
        } as AboutUsPageContent,
    });
};
