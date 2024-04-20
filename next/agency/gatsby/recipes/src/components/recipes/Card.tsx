import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { Btn } from '@/src/components/Btn';
import { ContentManager } from '@/src/components/ContentManager';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore//@ts-ignore
import { ReactComponent as ArrowIcon } from '@/src/assets/icons/arrow-right.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore//@ts-ignore
import { ReactComponent as DownloadIcon } from '@/src/assets/icons/download.svg';
import { RecipeLight } from '@/types';

interface RecipesCardProps {
  card: RecipeLight;
  showTitleLayer?: boolean;
}

export const RecipesCard: React.FC<RecipesCardProps> = ({
  card,
  showTitleLayer,
}) => {
  return (
    <article>
      <Link className="flex flex-col" to={`/recipes/${card.slug}`}>
        <div
          className={classnames('relative', {
            'lg:mb-[34px]': showTitleLayer,
          })}
        >
          <BCMSImage
            media={card.cover}
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
            className={classnames(
              'rounded-[10px] aspect-square overflow-hidden cover mb-[14px]',
              { 'lg:aspect-[1.88] lg:rounded-2xl lg:mb-0': showTitleLayer },
            )}
          />
          <Btn
            size="sm"
            className={classnames(
              'absolute z-10 bottom-10 left-1/2 -translate-x-1/2 justify-center min-w-max bg-white max-lg:hidden',
              { 'lg:hidden': showTitleLayer },
            )}
          >
            <span>Download recipe</span>
          </Btn>
          <div
            className={classnames(
              'absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center p-4 rounded-2xl',
              { 'max-lg:hidden': showTitleLayer, hidden: !showTitleLayer },
            )}
          >
            <div className="text-[32px] leading-none font-semibold tracking-[-0.41px] text-white text-center">
              {card.title}
            </div>
          </div>
        </div>
        <div className="mb-4 lg:flex lg:flex-row-reverse lg:justify-between lg:mb-3">
          <div className="flex flex-wrap gap-2 mb-2.5 lg:mb-0">
            {card.categories.map((category, index) => (
              <div
                key={index}
                className="px-2.5 py-[7px] bg-[#BCBD87]/10 rounded-[5px] text-xs leading-none font-medium tracking-[-0.41px] text-appAccent lg:px-[14px] lg:py-[9px] lg:text-sm lg:leading-none"
              >
                {category}
              </div>
            ))}
          </div>
          <div
            className={classnames(
              'text-appGray-600 text-sm leading-[1.3] font-medium tracking-[-0.41px] lg:leading-none',
              {
                'lg:text-xl': showTitleLayer,
                'lg:text-2xl': !showTitleLayer,
              },
            )}
          >
            {card.title}
          </div>
        </div>
        <ContentManager
          items={card.description}
          className={classnames(
            'text-lg font-medium leading-[1.4] tracking-[-0.41px] text-appGray-500 max-lg:hidden',
            {
              'lg:mb-6': showTitleLayer,
              'mb-[18px]': !showTitleLayer,
            },
          )}
        />
        <Btn
          size="sm"
          theme="gray"
          className="mb-2 justify-center lg:max-w-max"
        >
          <span className="text-left mr-1 lg:hidden">
            Ingredients and steps
          </span>
          <span className="text-left mr-2 max-lg:hidden">
            Show ingredients and steps
          </span>
          <ArrowIcon className="w-3 h-3 flex-shrink-0 lg:w-4 lg:h-4" />
        </Btn>
        <Btn
          size="sm"
          theme="gray"
          className="justify-center bg-transparent border-[#E8E8E8]/100 mb-2 lg:hidden"
        >
          <span className="text-left mr-1">Download recipe</span>
          <DownloadIcon src={DownloadIcon} className="w-3 h-3 flex-shrink-0" />
        </Btn>
      </Link>
    </article>
  );
};
