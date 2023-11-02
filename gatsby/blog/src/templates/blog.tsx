import React, { FC } from 'react';
import { Link } from 'gatsby';
import {
  BlogEntry,
  BlogEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';
import { ContentManager, PageWrapper, TopGradient } from '../components';
import { dateUtil } from '../utils/date';
import { BCMSImage } from 'gatsby-source-bcms/components';
import ArrowIcon from '../assets/icons/arrow.svg';
import { BlogsCard } from '../components/blogs/card';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { blogToLite } from '../utils/blog';

const SingleBlogTemplate: FC<{
  pageContext: {
    header: {
      bcms: {
        meta: {
          en: HeaderEntryMeta;
        };
      };
    };
    footer: {
      bcms: {
        meta: {
          en: FooterEntryMeta;
        };
      };
    };
    page: {
      bcms: {
        meta: {
          en: BlogEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    otherBlogs: Array<BlogEntry>;
  };
}> = ({ pageContext: ctx }) => {
  const liteBlogs = ctx.otherBlogs.map((e) => blogToLite(e));
  return (
    <PageWrapper {...ctx}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
        <div className="container">
          <div className="md:mb-20 lg:mb-[128px]">
            <div className="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
              <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                {dateUtil.format(ctx.page.bcms.meta.en.date)}
              </div>
              <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                {ctx.page.bcms.meta.en.title}
              </h1>
            </div>
            <BCMSImage
              media={ctx.page.bcms.meta.en.cover}
              options={{
                sizes: {
                  exec: [
                    {
                      width: 660,
                      height: 320,
                    },
                    {
                      width: 960,
                      height: 400,
                    },
                    {
                      width: 1344,
                      height: 554,
                    },
                  ],
                },
              }}
              className="aspect-[2.07] rounded-lg overflow-hidden w-full cover mb-6 md:mb-8 lg:aspect-[2.43]
                    lg:rounded-2xl lg:mb-12"
            />
            <ContentManager
              items={ctx.page.bcms.content.en}
              className="prose"
            />
          </div>
          <div className="max-md:hidden">
            <div className="flex items-center justify-between mb-8 lg:mb-12">
              <h2 className="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none">
                Other posts
              </h2>
              <Link
                to="/blog"
                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
              >
                <span className="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none">
                  See all posts
                </span>
                <img
                  src={ArrowIcon}
                  alt="Arrow"
                  className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
                />
              </Link>
            </div>
            <div className="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8">
              {liteBlogs.map((blog, index) => (
                <BlogsCard key={index} blog={blog} />
              ))}
            </div>
          </div>
        </div>
        <TopGradient />
      </div>
    </PageWrapper>
  );
};

export default SingleBlogTemplate;
