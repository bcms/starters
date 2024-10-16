import React from 'react';
import classNames from 'classnames';
import ContentManager from './ContentManager';
import { LegalEntry } from '@bcms-types/types/ts';

interface Props {
    legal: LegalEntry[];
    onClose: () => void;
}

const LegalEntries: React.FC<Props> = ({ legal, onClose }) => {
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative z-10 bg-white rounded-2xl border border-[#D4D4D4] p-6 w-[962px] max-w-[95vw] max-h-[90vh] overflow-y-auto overscroll-contain lg:p-14">
                <div className="grid grid-cols-1 gap-6">
                    {legal.map((item, index) => (
                        <div
                            key={index}
                            className="border border-[#E6E6E6] rounded-lg p-4 lg:p-6"
                        >
                            <h2
                                className={classNames(
                                    'leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-3',
                                    item.meta.en?.title &&
                                        'lg:text-[32px] lg:leading-none lg:mb-5',
                                )}
                            >
                                {item.meta.en?.title}
                            </h2>
                            <ContentManager
                                items={item.content.en || []}
                                className={classNames(
                                    'text-sm leading-[1.4] font-medium tracking-[-0.02em] text-appGray-500',
                                    'lg:text-lg lg:leading-normal lg:tracking-[-0.04em]',
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#171717B2]"
                onClick={onClose}
            />
        </div>
    );
};

export default LegalEntries;
