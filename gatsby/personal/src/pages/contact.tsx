import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import FormText from '@/components/form/Text';
import React, { useRef, useState } from 'react';
import {
  ContactPageEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

interface ContactForm {
  phone: string;
  fullName: string;
  email: string;
  message: string;
}
const ContactPage: React.FC<{
  data: {
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
          en: ContactPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
  };
}> = ({ data }) => {
  const [form, setForm] = useState<ContactForm>({
    phone: '',
    fullName: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<
    Record<keyof Omit<ContactForm, 'phone'>, boolean>
  >({
    fullName: false,
    email: false,
    message: false,
  });

  const me = useRef({
    phone: '(+1) 734 8123 8162',
    email: 'qwerty@mail.com',
  });

  const handleUpdateForm = (field: keyof ContactForm, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    // Reset form errors
    setFormErrors({
      fullName: false,
      email: false,
      message: false,
    });

    // Validate form fields
    const errors: Record<string, boolean> = {};
    if (!form.fullName) {
      errors.fullName = true;
    }
    if (!form.email) {
      errors.email = true;
    }
    if (!form.message) {
      errors.message = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Submit the form if there are no errors
    }
  };
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/contact"
    >
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={data.page.bcms.meta.en.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <form className="md:grid md:grid-cols-2 md:gap-x-[72px]">
            <FormText
              value={me.current.phone}
              label="Phone number"
              className="mb-5"
              isReadOnly={true}
              onChange={(value) => handleUpdateForm('phone', value)}
            />
            <FormText
              value={me.current.email}
              type="email"
              label="Email"
              isReadOnly={true}
              className="mb-8 md:mb-14 lg:mb-16"
            />
            <div className="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica mb-8 md:col-span-2 md:text-2xl md:mb-10 lg:text-[40px] lg:leading-[1.2]">
              To reach out to me, <br />
              please fill in the form below.
            </div>
            <FormText
              error={formErrors.fullName}
              value={form.fullName}
              label="Fill your name"
              placeholder="Full name"
              className="mb-5 lg:mb-4"
              onChange={(value) => handleUpdateForm('fullName', value)}
            />
            <FormText
              error={formErrors.email}
              value={form.email}
              onChange={(value) => handleUpdateForm('email', value)}
              type="email"
              label="Fill your email"
              placeholder="Email address"
              className="mb-5 lg:mb-4"
            />
            <FormText
              error={formErrors.message}
              value={form.message}
              onChange={(value) => handleUpdateForm('message', value)}
              label="Write me a message"
              placeholder="Write me a message"
              className="mb-8 md:col-span-2"
            />
            <button
              type="button"
              className="flex items-center justify-center px-4 py-[9px] border rounded-[32px] text-white border-appText bg-appText max-w-max lg:px-7 lg:py-3"
              onClick={() => handleFormSubmit()}
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsContactPage {
      ...ContactPage
    }
  }
`;

export default ContactPage;
