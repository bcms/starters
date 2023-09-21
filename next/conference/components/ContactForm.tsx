import React, { useState } from 'react';
import FormText from '@/components/form/Text';
import FormSelect from '@/components/form/Select';

interface ContactFormProps {
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  message: string;
  query: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    query: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="relative z-10 bg-white rounded-2xl border border-[#D4D4D4] p-6 w-[736px] max-w-[95vw] max-h-[90vh] overflow-y-auto overscroll-contain lg:p-10">
        <form
          className="grid grid-cols-1 gap-4 lg:gap-10"
          onSubmit={handleSubmit}
        >
          <FormText
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(name) => setForm({ ...form, name })}
          />
          <FormText
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(email) => setForm({ ...form, email })}
          />
          <FormText
            placeholder="Enter your message"
            value={form.message}
            onChange={(message) => setForm({ ...form, message })}
            type="textarea"
            label="Message"
          />
          <FormSelect
            onSelect={(query) => setForm({ ...form, query })}
            value={form.query}
            options={['Option 1', 'Option 2', 'Option 3']}
            label="Type of Query"
            placeholder="Selects the type of query"
          />
          <button
            className="flex justify-center w-full p-[17px] rounded-lg bg-[#7EE984] text-sm leading-none font-medium tracking-[-0.04em] text-appGray-600 lg:p-5 lg:text-2xl lg:leading-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#171717B2]"
        onClick={onClose}
      />
    </div>
  );
};

export default ContactForm;
