import React, { useState } from 'react';
import { PageData, ReservationPageData } from '@/types';
import { graphql, Link } from 'gatsby';
import Btn from '@/src/components/Btn';
import ArchWithStar from '@/src/components/ArchWithStar';
import { FormText } from '@/src/components/form/Text';
import classNames from 'classnames';
import { PageWrapper } from '@/src/components/PageWrapper';
import { useLocation } from '@reach/router';

interface ReservationForm {
  name: string;
  date: string;
  time: string;
  guestsCount: string;
  email: string;
  notes: string;
  acceptTerms: boolean;
}

interface ReservationPageProps {
  data: PageData<ReservationPageData>;
}
const ReservationPage: React.FC<ReservationPageProps> = ({ data }) => {
  const location = useLocation();
  const [form, setForm] = useState<ReservationForm>({
    name: '',
    guestsCount: '',
    email: '',
    notes: '',
    acceptTerms: false,
    time: '',
    date: '',
  });

  const [formErrors, setFormErrors] = useState<
    Record<keyof Omit<ReservationForm, 'acceptTerms'>, boolean>
  >({
    name: false,
    guestsCount: false,
    email: false,
    notes: false,
    time: false,
    date: false,
  });
  const handleUpdateForm = (
    name: keyof ReservationForm,
    value: string | boolean,
  ): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    setFormErrors({
      name: false,
      guestsCount: false,
      email: false,
      notes: false,
      time: false,
      date: false,
    });

    // Validate form fields
    const errors: Record<string, boolean> = {};
    if (!form.name) {
      errors.name = true;
    }
    if (!form.email) {
      errors.email = true;
    }
    if (!form.notes) {
      errors.notes = true;
    }

    if (!form.date) {
      errors.date = true;
    }

    if (!form.guestsCount) {
      errors.guestsCount = true;
    }

    if (!form.time) {
      errors.time = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Submit the form if there are no errors
    }
  };

  return (
    <PageWrapper
      location={location.pathname}
      page={data.page}
      header={data.header}
      footer={data.footer}
    >
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[808px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-10 lg:text-5xl lg:leading-none lg:mb-14">
              {data.page.bcms.meta.en.title}
            </h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid grid-cols-2 gap-x-[14px] gap-y-[22px] lg:gap-x-4 lg:gap-y-[30px]"
            >
              <FormText
                value={form.name}
                label="Name"
                placeholder="Enter your full name or nickname..."
                error={formErrors.name}
                className="col-span-2"
                onChange={(value) => handleUpdateForm('name', value)}
              />
              <FormText
                error={formErrors.date}
                value={form.date}
                onChange={(value) => handleUpdateForm('date', value)}
                type="date"
                label="Date"
                placeholder="DD/MM/YYYY"
              />
              <FormText
                error={formErrors.time}
                value={form.time}
                onChange={(value) => handleUpdateForm('time', value)}
                type="time"
                label="Time"
                placeholder="Enter time"
              />
              <FormText
                error={formErrors.guestsCount}
                value={form.guestsCount}
                onChange={(value) => handleUpdateForm('guestsCount', value)}
                label="Number of guests"
                placeholder="Number of guests"
              />
              <FormText
                error={formErrors.email}
                value={form.email}
                onChange={(value) => handleUpdateForm('email', value)}
                label="Email / Phone"
                placeholder="Email or phone..."
              />
              <FormText
                error={formErrors.notes}
                value={form.notes}
                onChange={(value) => handleUpdateForm('notes', value)}
                type="textarea"
                label="Notes"
                placeholder="If you have special requirements..."
                className="col-span-2"
              />
              <label className="flex items-start col-span-2 cursor-pointer">
                <input
                  value={String(form.acceptTerms)}
                  type="checkbox"
                  className="sr-only"
                  onChange={() =>
                    handleUpdateForm('acceptTerms', !form.acceptTerms)
                  }
                />
                <div
                  className={classNames(
                    'flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-[3px] border mt-0.5 mr-2 transition-colors duration-300 lg:mr-[14px]',
                    {
                      'border-appAccent bg-appAccent': form.acceptTerms,
                      'border-[#A8A7A0]': !form.acceptTerms,
                    },
                  )}
                >
                  {form.acceptTerms && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-xs leading-[1.2] tracking-[-0.41px] text-[#665E5E] lg:text-base lg:leading-[1.2]">
                  By submitting this form, you confirm you have read and
                  understood how Tastyyy processes your personal data for the
                  purpose of making a reservation and in accordance with the
                  terms of the
                  <Link className="underline" to="/">
                    Privacy Notice
                  </Link>
                  .
                </div>
              </label>
              <Btn
                theme="accent"
                size="lg"
                className="justify-center w-full col-span-2"
                onClick={() => handleFormSubmit()}
              >
                <span>Submit your reservation</span>
              </Btn>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }

    page: bcmsReservationPage {
      ...ReservationPage
    }
  }
`;

export default ReservationPage;
