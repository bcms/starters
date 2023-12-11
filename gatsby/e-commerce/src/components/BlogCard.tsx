import { BlogAuthorEntryMeta, BlogEntryMeta } from '@/bcms/types';
import React from 'react';
import { Link } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import classNames from 'classnames';
import { toLite } from '@/utils/toLite';

interface BlogCardProps {
  card: BlogEntryMeta;
  className?: string;
}
export const BlogCard: React.FC<BlogCardProps> = ({ card, className }) => {
  const formattedDate = (date: number) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const author = toLite<
    BlogAuthorEntryMeta,
    { blogAuthor: { meta: { en: BlogAuthorEntryMeta } } }
  >(card.author as any);
  return (
    <Link
      className={classNames('group flex flex-col', className)}
      to={`/blog/${card.slug}`}
    >
      <div className="flex overflow-hidden mb-6">
        <BCMSImage
          media={card.cover}
          options={{
            sizes: {
              exec: [
                {
                  width: 640,
                },
              ],
            },
          }}
          className="w-full h-[320px] cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-500 mb-3 lg:text-[18px]">
          <div>{formattedDate(card.date)}</div>
          <div className="w-1 h-1 rounded-full bg-current mt-1" />
          <div>By {author?.title}</div>
        </div>
        <h3 className="text-xl leading-none tracking-[-2%] lg:text-[24px]">
          {card.title}
        </h3>
      </div>
      <div className="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] mt-auto bg-appText text-white transition-colors duration-300 hover:bg-appText/80">
        Read now
      </div>
    </Link>
  );
};

export default BlogCard;
