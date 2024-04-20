import React from 'react';
import ContentManager from '../ContentManager'; 
import BCMSImage from 'next-plugin-bcms/components/image'; 
import Link from 'next/link'; 
import SvgoArrow from '../../assets/icons/arrow.svg'; 
import { HomeTeamGroup } from '@/bcms/types';

interface TeamProps {
  data: HomeTeamGroup;
}

const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <section className="mb-8 lg:mb-20 xl:mb-32">
      <div className="container">
        <div 
          className="grid grid-cols-[62.5%,37.5%] min-h-[280px] rounded-2xl overflow-hidden mb-4 lg:grid-cols-[51%,49%] lg:mb-6" 
          style={{ boxShadow: '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)' }}
        >
          <div className="flex flex-col justify-between bg-appAccent2 text-appText-light p-4 pr-8 lg:p-8">
            <h2 className="text-sm font-bold leading-tight tracking-[-0.28px] max-w-[540px] mb-14 lg:text-[32px] lg:font-bold lg:tracking-[-0.64px] lg:mb-[200px] xl:mb-[520px]">
              {data.title}
            </h2>
            <ContentManager 
              item={data.description}
              className="text-xs leading-tight tracking-[-0.24px] max-w-[483px] lg:text-base lg:leading-tight lg:tracking-[-0.32px]"
            />
          </div>
          <BCMSImage 
            media={data.cover}
            options={{ 
              sizes: {
                exec: [
                  {
                    width: 1272,
                    height: 1488,
                  },
                ],
              },
            }} 
            className="full"
          />
        </div>
          <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:justify-between lg:mb-[72px]">
            <div className="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0">
              {data.subtitle}
            </div>
            <div className="lg:max-w-[50%]">
              <h2 className="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[66%] xl:max-w-[60%]">
                {data.members_title}
              </h2>
              <ContentManager 
                item={data.members_description}
                className="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 lg:gap-6">
            <div className="grid grid-cols-3 gap-2 lg:gap-6">
              {data.members.map((item, index) => (
                <BCMSImage 
                  key={index}
                  media={item.meta.en?.image}
                  options={{ 
                    sizes: {
                      exec: [
                        {
                          width: 820,
                          height: 902,
                        },
                      ],
                    },
                  }}
                  className="full aspect-[0.48] rounded overflow-hidden lg:rounded-2xl lg:aspect-[0.9]"
                  style={{ boxShadow: '0px 0px 0px 0.227px #EDEDED, 0px 0.34px 0.227px 0px rgba(15, 18, 35, 0.14)' }}
                />
              ))}
            </div>
            <Link href="/team" passHref> 
              <a className="flex items-center gap-1 text-appGray-300 transition-colors duration-300 mb-8 hover:text-appText lg:mb-6">
                <span className="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]">
                  See our team
                </span>
                <SvgoArrow className="w-4 h-4" /> 
              </a>
            </Link>
          </div>
      </div>
    </section>
    
  );
};

export default Team;
