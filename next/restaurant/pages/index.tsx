import { HomePageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  EventEntry,
  EventEntryMeta,
  FoodItemEntry,
  FoodItemEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
  TestimonialEntry,
  TestimonialEntryMeta,
} from '@/bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import HomePageHero from '@/components/home-page/Hero';
import HomePageSeasons from '@/components/home-page/Seasons';
import HomepageMenu from '@/components/home-page/Menu';
import HomePageAmbience from '@/components/home-page/Ambience';
import HomepageSpecials from '@/components/home-page/Specials';
import HomepageEvents from '@/components/home-page/Events';
import HomepageTestimonials from '@/components/home-page/Testimonials';
const IndexPage: React.FC<PageProps<HomePageData>> = ({
  header,
  page,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <HomePageHero data={page.meta.hero} />
      <HomepageMenu data={page.meta.menu} />
      <HomePageSeasons data={page.meta.seasons} />
      <HomePageAmbience data={page.meta.ambience} />
      <HomepageSpecials data={page.meta.specials} items={page.specials} />
      <HomepageEvents data={page.meta.events} items={page.events} />
      <HomepageTestimonials
        data={page.meta.testimonials}
        items={page.testimonials}
      />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();

  try {
    const { header, footer } = await getHeaderAndFooter(client);

    const homePage = (await client.entry.get({
      // Template name or ID
      template: 'home_page',
      // Entry slug or ID
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    const foodItems = (await client.entry.getAll({
      // Food name or ID
      template: 'food_item',
    })) as FoodItemEntry[];
    const eventItems = (await client.entry.getAll({
      // Event name or ID
      template: 'event',
    })) as EventEntry[];
    const testimonialItems = (await client.entry.getAll({
      // Testimonial name or ID
      template: 'testimonial',
    })) as TestimonialEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          meta: homePage.meta.en as HomePageEntryMeta,
          specials: foodItems
            .filter((e) => e.meta.en?.special)
            .map((e) => e.meta.en) as FoodItemEntryMeta[],
          events: eventItems.map((e) => e.meta.en) as EventEntryMeta[],
          testimonials: testimonialItems.map(
            (e) => e.meta.en,
          ) as TestimonialEntryMeta[],
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default IndexPage;
