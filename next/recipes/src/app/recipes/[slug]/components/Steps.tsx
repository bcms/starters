'use client';

import React, { useState } from 'react';
import classnames from 'classnames';
import { RecipeStepGroup } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';
import ContentManager from '@/components/ContentManager';
import ArrowIcon from '@/assets/icons/arrow-right.svg';
import Btn from '@/components/Btn';

interface Props {
    steps: RecipeStepGroup[];
    bcmsConfig: ClientConfig;
}

export const Steps: React.FC<Props> = ({ steps, bcmsConfig }) => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div className="mb-8 lg:mb-20 xl:mb-[120px]">
            <h2 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6 lg:text-2xl lg:leading-none lg:mb-10">
                Steps
            </h2>
            <div className="border border-[#E8E8E8] rounded-md p-4 pb-6 mb-6 lg:p-6 lg:pb-8 lg:rounded-xl lg:mb-12">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={classnames('mb-5 lg:mb-10', {
                            'absolute opacity-0 pointer-events-none':
                                activeStep !== index,
                        })}
                    >
                        <BCMSImage
                            media={step.cover}
                            clientConfig={bcmsConfig}
                            className="aspect-[1.475] rounded-md overflow-hidden w-full object-cover mb-4 lg:aspect-[2.2] lg:rounded-xl lg:mb-10"
                        />
                        <div className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-2xl lg:leading-none lg:mb-6">
                            {step.title}
                        </div>
                        <ContentManager
                            items={step.description.nodes}
                            className="text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] lg:text-lg lg:leading-[1.55]"
                        />
                    </div>
                ))}
                <div className="flex items-center gap-2.5 lg:gap-[14px]">
                    {Array(steps.length)
                        .fill(0)
                        .map((_, index) => (
                            <button
                                key={index}
                                className={classnames(
                                    'flex flex-1 h-1 transition-colors duration-300 lg:h-2 lg:rounded-sm',
                                    {
                                        'bg-appAccent': index <= activeStep,
                                        'bg-[#EBEBEB]': index > activeStep,
                                    },
                                )}
                                onClick={() => setActiveStep(index)}
                            />
                        ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 lg:max-w-[424px] lg:mx-auto lg:gap-6">
                <Btn
                    theme="gray"
                    disabled={activeStep === 0}
                    className="justify-center"
                    onClick={() => setActiveStep((prev) => prev - 1)}
                >
                    <ArrowIcon className="w-[14px] h-[14px] mr-2 rotate-180 lg:w-5 lg:h-5" />
                    <span>Previous</span>
                </Btn>
                <Btn
                    theme="gray"
                    disabled={activeStep === steps.length - 1}
                    className="justify-center"
                    onClick={() => setActiveStep((prev) => prev + 1)}
                >
                    <span className="mr-2">Next</span>
                    <ArrowIcon className="w-[14px] h-[14px] lg:w-5 lg:h-5" />
                </Btn>
            </div>
        </div>
    );
};
