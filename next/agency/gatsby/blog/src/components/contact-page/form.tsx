import React, { FC, useState, FormEvent } from 'react';
import EmailIcon from '../../assets/icons/email.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import EmailBg from '../../assets/media/email-bg.png';
import { FormText } from '../form';

export interface ContactFormProps {
  email: string;
}

export interface ContactFormFields {
  email: string;
  name: string;
  question: string;
}

export type ContactFormFieldName = keyof ContactFormFields;

export const ContactPageForm: FC<ContactFormProps> = (props) => {
  const [form, setForm] = useState<ContactFormFields>({
    name: '',
    email: '',
    question: '',
  });

  const handleFormChange = (value: string, field: ContactFormFieldName) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    //Todo
    event.preventDefault();
  };

  return (
    <section className="pb-8 md:pb-20 lg:pb-[108px]">
      <div className="container max-w-[1136px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 lg:gap-8"
          >
            <FormText
              value={form.name}
              label="What’s your name"
              placeholder="Enter your name"
              onChange={handleFormChange}
              name="name"
            />
            <FormText
              value={form.email}
              type="email"
              label="What’s your email address"
              placeholder="Enter your email"
              onChange={handleFormChange}
              name="email"
            />
            <FormText
              value={form.question}
              type="textarea"
              label="What’s your question"
              placeholder="Your message..."
              onChange={handleFormChange}
              name="question"
            />
            <button
              type="submit"
              className="flex justify-center w-full bg-appText text-white px-5 py-3 rounded-[32px] leading-none tracking-[-0.41px] max-lg:mt-4 lg:text-2xl lg:leading-none lg:py-4"
            >
              Submit
            </button>
          </form>
          <div className="flex justify-center">
            <a
              href={`mailto:${props.email}`}
              className="relative flex items-center justify-center w-[227px] aspect-square rounded-full lg:w-[400px]"
            >
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={EmailIcon}
                  className="w-8 h-8 mb-2 lg:w-12 lg:h-12 lg:mb-6"
                />
                <div className="leading-none font-medium tracking-[-0.41px] text-white lg:text-xl lg:leading-none">
                  {props.email}
                </div>
              </div>
              <img
                src={EmailBg}
                alt="Bg"
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
