'use client';

import React, { useState } from 'react';
import classnames from 'classnames';
import { QaItemGroup } from '@bcms-types/types/ts';
import ChevronIcon from '@/assets/icons/chevron-down.svg';
import ContentManager from '@/components/ContentManager';

interface Props {
    item: QaItemGroup;
}

export const QAItem: React.FC<Props> = ({ item }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="border border-[#E8E8E8] rounded-lg">
            <button
                className="flex items-center justify-between px-[14px] py-4 w-full text-left lg:px-6 lg:py-5"
                onClick={() => setShowAnswer((prev) => !prev)}
            >
                <span className="text-xs leading-none font-semibold text-appGray-700 tracking-[-0.41px] lg:text-base lg:leading-none">
                    {item.question}
                </span>
                <ChevronIcon
                    className={classnames(
                        'w-4 h-4 transition-transform duration-300',
                        {
                            'rotate-180': showAnswer,
                        },
                    )}
                />
            </button>
            {showAnswer && (
                <ContentManager
                    items={item.answer.nodes}
                    className="px-[14px] pb-[18px] -mt-1 text-sm leading-[1.55] tracking-[-0.41px] text-appGray-500 lg:px-6 lg:pb-5 lg:text-lg"
                />
            )}
        </div>
    );
};
