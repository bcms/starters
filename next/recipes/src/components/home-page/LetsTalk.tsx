'use client';

import React, { useState, FormEvent } from 'react';
import ContentManager from '@/components/ContentManager';
import Phone from '@/assets/icons/phone.svg';
import Email from '@/assets/icons/email.svg';
import classnames from 'classnames';
import Btn from '@/components/Btn';
import { PropRichTextDataParsed } from '@thebcms/types';

interface ContactForm {
    name: string;
    email: string;
    question: string;
}

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    phone: PropRichTextDataParsed;
    email: PropRichTextDataParsed;
}

const HomePageLetsTalk: React.FC<Props> = ({
    title,
    description,
    phone,
    email,
}) => {
    const [form, setForm] = useState<ContactForm>({
        email: '',
        name: '',
        question: '',
    });

    const [formErrors, setFormErrors] = useState<
        Record<keyof ContactForm, boolean>
    >({
        email: false,
        name: false,
        question: false,
    });

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        setFormErrors({
            email: false,
            name: false,
            question: false,
        });

        // Validate form fields
        const errors: Record<string, boolean> = {};
        if (!form.name) {
            errors.name = true;
        }
        if (!form.email) {
            errors.email = true;
        }
        if (!form.question) {
            errors.question = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form if there are no errors
        }
    };

    return (
        <section className="relative pb-8 lg:pb-20 xl:pb-[120px]">
            <div className="container">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20 lg:items-center xl:gap-[114px] xl:pr-20">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-4xl lg:leading-none lg:mb-6">
                            {title}
                        </h2>
                        <ContentManager
                            items={description.nodes}
                            className="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 mb-6 lg:text-lg lg:leading-normal lg:mb-14"
                        />
                        <div className="grid grid-cols-1 gap-5 lg:gap-10">
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="flex items-center mb-2 lg:mb-4">
                                    <Phone className="w-3 h-3 mr-1.5 lg:w-[18px] lg:h-[18px]" />
                                    <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 lg:text-lg lg:leading-none">
                                        Telephone
                                    </div>
                                </div>
                                <ContentManager
                                    items={phone.nodes}
                                    className="text-sm leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-2xl lg:leading-none"
                                />
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="flex items-center mb-2 lg:mb-4">
                                    <Email className="w-3 h-3 mr-1.5 lg:w-[18px] lg:h-[18px]" />
                                    <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 lg:text-lg lg:leading-none">
                                        Email
                                    </div>
                                </div>
                                <ContentManager
                                    items={email.nodes}
                                    className="text-sm leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-2xl lg:leading-none"
                                />
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="border border-[#E0E0E0] rounded-lg p-4 lg:p-8"
                    >
                        <label
                            className={classnames(
                                'relative flex border rounded-lg overflow-hidden w-full mb-3 transition-colors duration-300 lg:mb-6',
                                {
                                    'border-red-500': formErrors.name,
                                    'border-[#F0F0F0]': !formErrors.name,
                                },
                            )}
                        >
                            <input
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        ['name']: target.value,
                                    }))
                                }
                                value={form.name}
                                type="text"
                                className="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none"
                            />
                            {!form.name.length && (
                                <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none">
                                    Full name
                                    <span className="text-appWarning">*</span>
                                </span>
                            )}
                        </label>
                        <label
                            className={classnames(
                                'relative flex border rounded-lg overflow-hidden w-full mb-3 transition-colors duration-300 lg:mb-6',
                                {
                                    'border-red-500': formErrors.email,
                                    'border-[#F0F0F0]': !formErrors.email,
                                },
                            )}
                        >
                            <input
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        ['email']: target.value,
                                    }))
                                }
                                value={form.email}
                                type="email"
                                className="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none"
                            />
                            {!form.email.length && (
                                <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none">
                                    Email
                                    <span className="text-appWarning">*</span>
                                </span>
                            )}
                        </label>
                        <label
                            className={classnames(
                                'relative flex border rounded-lg overflow-hidden w-full mb-6 transition-colors duration-300 lg:mb-8',
                                {
                                    'border-red-500': formErrors.question,
                                    'border-[#F0F0F0]': !formErrors.question,
                                },
                            )}
                        >
                            <textarea
                                onChange={({ target }) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        ['question']: target.value,
                                    }))
                                }
                                value={form.question}
                                className="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] resize-none h-[140px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none lg:h-[260px]"
                            />
                            {!form.question && (
                                <span className="absolute top-5 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none lg:top-6">
                                    Question
                                    <span className="text-appWarning">*</span>
                                </span>
                            )}
                        </label>
                        <Btn
                            onClick={() => handleSubmit()}
                            theme="dark"
                            className="justify-center w-full"
                        >
                            <span>Submit</span>
                        </Btn>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomePageLetsTalk;
