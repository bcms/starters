import { HomeMenuGroup } from '@/bcms/types';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import Link from 'next/link';
import HomePageDivider from '@/components/home-page/Divider';
interface HomepageMenuProps {
  data: HomeMenuGroup;
}

const HomepageMenu: React.FC<HomepageMenuProps> = ({ data }) => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center mb-8 lg:mb-[88px]">
          <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
            [ 1 ]
          </div>
          <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
            {data.title}
          </h2>
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto lg:text-base lg:leading-[1.3]"
          />
        </div>
      </div>
      {data.meals.map((meal, index) => (
        <Link key={index} href={`/menu?s=${meal.meta.en?.title.toLowerCase()}`}>
          <a className="flex relative">
            {meal.meta.en && (
              <div className="container">
                <div className="relative z-10 flex flex-col items-center text-center py-12 max-w-[765px] mx-auto lg:py-[150px]">
                  <h3 className="text-sm leading-none font-Gloock text-white uppercase mb-3 lg:text-[32px] lg:leading-none lg:mb-[18px]">
                    {meal.meta.en.title}
                  </h3>
                  <ContentManager
                    item={meal.meta.en.description}
                    className="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 lg:text-lg lg:leading-[1.3]"
                  />
                </div>
                <BCMSImage
                  media={meal.meta.en?.cover}
                  className="absolute top-0 left-0 w-full h-full cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
              </div>
            )}
          </a>
        </Link>
      ))}
      <HomePageDivider />
    </section>
  );
};

export default HomepageMenu;
