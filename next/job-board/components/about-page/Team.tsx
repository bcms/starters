import React from 'react';
import { AboutTeamGroup, TeamMemberEntryMeta } from '@/bcms/types';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager'; // Import ContentManager from the correct path

interface TeamSectionProps {
  data: AboutTeamGroup;
  members: TeamMemberEntryMeta[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ data, members }) => {
  return (
    <section>
      <div className="container">
        <h2 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 lg:text-5xl lg:leading-none lg:mb-5">
          {data.title}
        </h2>
        <ContentManager
          item={data.description}
          className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 text-center max-w-[833px] mx-auto mb-10 lg:text-lg lg:leading-normal lg:mb-[105px]"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-14">
          {members.map((member, index) => (
            <div key={index}>
              <div className="relative rounded-xl overflow-hidden mb-[18px] lg:mb-6">
                <BCMSImage
                  media={member.image}
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 650,
                          height: 650,
                        },
                      ],
                    },
                  }}
                  className="aspect-[1.69] cover xl:aspect-square"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
              </div>
              <div className="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-2xl lg:leading-none lg:mb-[14px]">
                {member.title}
              </div>
              <div className="text-xs leading-none font-medium tracking-[-0.41px] text-[#48465F] mb-3 lg:text-xl lg:leading-none lg:mb-5">
                {member.role}
              </div>
              <ContentManager
                item={member.description}
                className="text-xs leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
