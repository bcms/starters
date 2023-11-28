import React from 'react';
import { AboutTeamGroup, TeamMemberEntry } from '../../../bcms/types';
import { BCMSImage } from 'gatsby-source-bcms/components';
import ContentManager from '@/components/ContentManager'; // Import ContentManager from the correct path
import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';

interface TeamSectionProps {
  data: AboutTeamGroup;
  members: Array<{
    bcms: TeamMemberEntry;
  }>;
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
                  media={member.bcms.meta.en?.image as BCMSPropMediaDataParsed}
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
                {member.bcms.meta.en?.title}
              </div>
              <div className="text-xs leading-none font-medium tracking-[-0.41px] text-[#48465F] mb-3 lg:text-xl lg:leading-none lg:mb-5">
                {member.bcms.meta.en?.role}
              </div>
              <ContentManager
                item={
                  member.bcms.meta.en?.description as BCMSPropRichTextDataParsed
                }
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
