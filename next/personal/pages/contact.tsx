import { ContactPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import FormText from '@/components/form/Text';
import { useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import { ContactPageEntry, ContactPageEntryMeta } from '@/bcms/types';

interface ContactForm {
  phone: string;
  fullName: string;
  email: string;
  message: string;
}
const ContactPage: React.FC<PageProps<ContactPageData>> = ({
  header,
  footer,
  page,
}) => {
  const [form, setForm] = useState<ContactForm>({
    phone: '',
    fullName: '',
    email: '',
    message: '',
  });

  const me = useRef({
    phone: '(+1) 734 8123 8162',
    email: 'qwerty@mail.com',
  });

  // const handleSubmit = (e: any) => {
  //   //
  // };

  const handleUpdateForm = (field: keyof ContactForm, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={page.meta.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <form
            className="md:grid md:grid-cols-2 md:gap-x-[72px]"
            // onSubmit={handleSubmit}
          >
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
              value={form.fullName}
              label="Fill your name"
              placeholder="Full name"
              className="mb-5 lg:mb-4"
              onChange={(value) => handleUpdateForm('fullName', value)}
            />
            <FormText
              value={form.email}
              onChange={(value) => handleUpdateForm('email', value)}
              type="email"
              label="Fill your email"
              placeholder="Email address"
              className="mb-5 lg:mb-4"
            />
            <FormText
              value={form.message}
              onChange={(value) => handleUpdateForm('message', value)}
              label="Write me a message"
              placeholder="Write me a message"
              className="mb-8 md:col-span-2"
            />
            <button
              type="button"
              className="flex items-center justify-center px-4 py-[9px] border rounded-[32px] text-white border-appText bg-appText max-w-max lg:px-7 lg:py-3"
              // onClick={handleSubmit}
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<ContactPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const contactPage = (await client.entry.get({
      // Template name or ID
      template: 'contact_page',
      entry: 'contact',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: contactPage.meta.en as ContactPageEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default ContactPage;
