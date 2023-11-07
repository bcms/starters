import React, { FC } from 'react';
import { BlogLite } from '../../../types';
import { Link, graphql } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { ContentManager } from '../content-manager';
import OpenIcon from '../../assets/icons/open.svg';
import { dateUtil } from '../../utils/date';

interface BlogsCardProps {
  blog: BlogLite;
}

export const BlogsCard: FC<BlogsCardProps> = ({ blog }) => {
  return (
    <article>
      <Link to={`/blog/${blog.slug}`}>
        <BCMSImage
          media={blog.cover}
          options={{
            sizes: {
              exec: [
                {
                  width: 800,
                  height: 800,
                },
              ],
            },
          }}
          className="w-full cover aspect-[1.48] rounded-2xl overflow-hidden mb-4 xl:aspect-[1.04] xl:mb-6"
        />
        <div className="text-xs leading-none font-medium tracking-[-0.82px] text-appGray-400 mb-2 xl:text-base xl:leading-none xl:mb-4">
          {dateUtil.format(blog.date)}
        </div>
        <div className="flex items-center mb-2.5 xl:mb-4">
          <div className="text-sm leading-none font-medium tracking-[-0.41px] mr-2 xl:text-2xl xl:leading-none">
            {blog.title}
          </div>
          <div className="flex items-center justify-center p-0.5 rounded bg-[#F2F2F2] xl:p-1">
            <img src={OpenIcon} alt="Icon" className="w-3 h-3 xl:w-4 xl:h-4" />
          </div>
        </div>
        <ContentManager
          items={blog.description}
          className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 xl:text-xl xl:leading-[1.3]"
        />
      </Link>
    </article>
  );
};

export const query = graphql`
  fragment Blog on BlogEntry {
    bcms {
      meta {
        en {
          cover {
            _id
            alt_text
            caption
            height
            name
            src
            svg
            width
          }
          slug
          title
          date
          description {
            name
            type
            value
          }
          seo {
            title
            description
          }
        }
      }
    }
  }
`;
