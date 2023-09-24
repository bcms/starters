import ContentManager from '@/components/ContentManager';
import { HomeServices } from '@/types';

interface HomepageServicesProps {
  data: HomeServices;
}
const HomepageServices: React.FC<HomepageServicesProps> = ({ data }) => {
  return (
    <section className="pb-10 lg:pb-14">
      <div className="container">
        <div className="mb-5 md:flex md:items-start md:justify-between md:gap-16 md:mb-10 lg:gap-20">
          <div className="flex items-center mb-[14px] md:mt-4">
            <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1" />
            <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
              {data.title}
            </h2>
          </div>
          <ContentManager
            item={data.description}
            className="homeServices--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 md:max-w-[761px] lg:text-base lg:leading-[1.4]"
          />
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.items &&
            data.items.map((service, index) => (
              <li key={index} className="bg-[#F7F7F7] rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg text-sm leading-none tracking-[-0.41px] font-Helvetica mr-4 lg:w-[52px] lg:h-[52px] lg:text-base lg:leading-none"
                    style={{
                      backgroundColor: service.theme,
                    }}
                  >
                    {service.abbreviation}
                  </div>
                  <h3 className="leading-none font-medium tracking-[-0.41px] lg:text-xl lg:leading-none">
                    {service.title}
                  </h3>
                </div>
                <ContentManager
                  item={service.description}
                  className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-300"
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default HomepageServices;
