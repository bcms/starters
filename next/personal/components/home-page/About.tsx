import { HomeAbout } from '@/types';
import ContentManager from '@/components/ContentManager';
import React, { useState, useMemo } from 'react';

interface HomepageAboutProps {
  data: HomeAbout;
}

const HomepageAbout: React.FC<HomepageAboutProps> = ({ data }) => {
  const [degreesToShow, setDegreesToShow] = useState<number>(3);
  const [workHistoryItemsToShow, setWorkHistoryItemsToShow] =
    useState<number>(3);

  const visibleDegrees = useMemo(() => {
    return data.education.degrees.slice(0, degreesToShow);
  }, [degreesToShow]);

  const visibleWorkHistoryItems = useMemo(() => {
    return data.workHistory.items.slice(0, workHistoryItemsToShow);
  }, [workHistoryItemsToShow]);

  return (
    <section className="pb-10 lg:pb-14">
      <div className="relative container">
        <div className="relative z-10 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20">
          <div className="flex items-center mb-[14px] md:mt-4">
            <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1" />
            <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
              {data.title}
            </h2>
          </div>
          <div>
            <ContentManager
              item={data.description}
              className="homeAbout--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 pb-6 border-b border-appGray-100 mb-6 md:max-w-[761px] lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8"
            />
            <div className="pb-6 border-b border-appGray-100 mb-6 lg:pb-8 lg:mb-8">
              <div className="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none">
                {data.education.title}
              </div>
              <div className="flex flex-wrap gap-3">
                {visibleDegrees.map((degree, index) => (
                  <React.Fragment key={index}>
                    <div className="flex text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none">
                      {degree}
                    </div>
                    {visibleDegrees.length < data.education.degrees.length && (
                      <button
                        className="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-appGray-600 font-medium rounded-[32px] lg:text-base lg:leading-none"
                        onClick={() => setDegreesToShow(999)}
                      >
                        See all
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="pb-6 border-b border-appGray-100 lg:pb-8 lg:mb-8">
              <div className="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none">
                {data.workHistory.title}
              </div>
              <div className="flex flex-wrap gap-3">
                {visibleWorkHistoryItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
                  >
                    <span>{item.company_name}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-appGray-500 mx-1.5 lg:mx-2" />
                    <span>{new Date(item.from).getFullYear()}</span>
                  </div>
                ))}
                {visibleWorkHistoryItems.length <
                  data.workHistory.items.length && (
                  <button
                    className="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-appGray-600 font-medium rounded-[32px] lg:text-base lg:leading-none"
                    onClick={() => setWorkHistoryItemsToShow(999)}
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[40%] -translate-y-1/2 left-0 w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#FFBF4B] pointer-events-none max-md:hidden" />
      <div className="absolute top-[80%] -translate-y-1/2 -left-[15%] w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#3A437E] pointer-events-none max-md:hidden" />
    </section>
  );
};

export default HomepageAbout;
