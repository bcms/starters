import React from 'react';
import classNames from 'classnames';
import { PropRichTextDataParsed } from '@thebcms/types';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';
import { TicketGroup } from '../../../bcms/types/ts';

interface Prop {
    title: string;
    description: PropRichTextDataParsed;
    tickets: TicketGroup[];
    bcmsConfig: ClientConfig;
}

const HomeTickets: React.FC<Prop> = ({
    title,
    description,
    tickets,
    bcmsConfig,
}) => {
    return (
        <section id="tickets" className="pb-16 scroll-m-5 lg:pb-[130px]">
            <div className="container">
                <div className="leading-none tracking-[-0.02em] font-semibold text-center mb-3 lg:text-5xl lg:leading-none lg:mb-4">
                    {title}
                </div>
                <ContentManager
                    items={description.nodes}
                    className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-500 text-center max-w-[823px] mx-auto mb-10 lg:text-2xl lg:leading-none lg:mb-16"
                />
                <div className="grid grid-cols-1 gap-4 lg:gap-16">
                    {tickets &&
                        tickets.map((ticket, index) => (
                            <button
                                className="relative flex rounded-lg overflow-hidden p-[15px] text-left lg:rounded-3xl lg:p-14"
                                key={index}
                            >
                                <div className="relative z-10 w-full">
                                    <div
                                        className={classNames(
                                            'text-sm leading-none tracking-[-0.02em] font-semibold mb-10 lg:text-[40px] lg:leading-none lg:mb-[208px]',
                                            {
                                                'text-white':
                                                    ticket.theme === 'LIGHT',
                                            },
                                        )}
                                    >
                                        {ticket.title}
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-end">
                                            <div
                                                className={classNames(
                                                    'text-2xl leading-none mr-1 tracking-[-0.04em] font-semibold lg:text-[88px] lg:leading-none lg:mr-4',
                                                    {
                                                        'text-white':
                                                            ticket.theme ===
                                                            'LIGHT',
                                                    },
                                                )}
                                            >
                                                ${ticket.price}
                                            </div>
                                            {ticket.discount_price && (
                                                <div
                                                    className={classNames(
                                                        'text-sm leading-none tracking-[-0.04em] font-medium line-through opacity-50 lg:text-5xl lg:leading-none',
                                                        {
                                                            'text-white':
                                                                ticket.theme ===
                                                                'LIGHT',
                                                        },
                                                    )}
                                                >
                                                    ${ticket.discount_price}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={classNames(
                                                'flex items-center rounded-[48px] px-[18px] py-[13px] lg:px-[26px] lg:py-[19px]',
                                                {
                                                    'bg-white text-appText':
                                                        ticket.theme ===
                                                        'LIGHT',
                                                    'bg-appText text-white':
                                                        ticket.theme !==
                                                        'LIGHT',
                                                },
                                            )}
                                        >
                                            <span className="text-sm leading-none tracking-[-0.41px] font-medium mr-2 lg:text-lg lg:leading-none">
                                                Buy now
                                            </span>
                                            <svg
                                                className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]"
                                                viewBox="0 0 77 72"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M40.1818 71.733L32.5739 64.1989L55.3608 41.4119H0V30.4062H55.3608L32.5739 7.65625L40.1818 0.0852256L76.0057 35.9091L40.1818 71.733Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <BCMSImage
                                    media={ticket.background_image}
                                    clientConfig={bcmsConfig}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTickets;
