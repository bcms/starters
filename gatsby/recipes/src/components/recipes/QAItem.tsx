import React, { useState } from 'react';
import { QaItemGroup } from '@/bcms/types';
import { ReactComponent as ChevronIconChevronIcon } from '@/src/assets/icons/chevron-down.svg';
import classnames from 'classnames';
import { ContentManager } from '@/src/components/ContentManager';

interface QAItemProps {
  item: QaItemGroup;
}

export const RecipesQAItem: React.FC<QAItemProps> = ({ item }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className="border border-[#E8E8E8] rounded-lg">
      <button
        className="flex items-center justify-between px-[14px] py-4 w-full text-left lg:px-6 lg:py-5"
        onClick={() => setShowAnswer((prev) => !prev)}
      >
        <span className="text-xs leading-none font-semibold text-appGray-700 tracking-[-0.41px] lg:text-base lg:leading-none">
          {item.question}
        </span>
        <ChevronIconChevronIcon
          className={classnames('w-4 h-4 transition-transform duration-300', {
            'rotate-180': showAnswer,
          })}
        />
      </button>
      {showAnswer && (
        <ContentManager
          items={item.answer}
          className="px-[14px] pb-[18px] -mt-1 text-sm leading-[1.55] tracking-[-0.41px] text-appGray-500 lg:px-6 lg:pb-5 lg:text-lg"
        />
      )}
    </div>
  );
};
