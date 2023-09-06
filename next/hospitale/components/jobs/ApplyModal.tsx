import { FC, useRef, useState } from 'react';
import { JobEntryMeta } from '@/bcms/types';
import FormText from '@/components/form/Text';
import FormDropzone from '@/components/form/Dropzone';
import Btn from '@/components/Btn';

interface JobApplicationFormProps {
  job: JobEntryMeta;
  close: () => void;
}

interface Form {
  firstName: string;
  lastName: string;

  address: string;

  email: string;

  birthDate: string;

  description: string;
}

const JobApplicationForm: FC<JobApplicationFormProps> = ({ close }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    address: '',
    birthDate: '',
  });

  const [file, setFile] = useState<File | undefined>(undefined);

  const handelUpdateForm = (name: string, value: string): void => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current) {
      // const formData = new FormData(formRef.current);
      // You can now access form data as formData.get('inputName')
      // TODO: Implement your form submission logic here
    }
  };

  return (
    <div className="fixed z-[60] top-0 left-0 w-full h-full pt-[100px] px-6">
      <div className="relative z-10 bg-[#E3E1DC] border border-[#B0AEAB] p-6 rounded-[14px] max-w-[632px] mx-auto max-h-[80vh] overflow-auto overscroll-contain lg:p-8">
        <form
          ref={formRef}
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
        >
          <fieldset className="grid grid-cols-2 items-end gap-2 lg:gap-3">
            <FormText
              name="firstName"
              label="Name"
              placeholder="First name..."
              onChange={(value) => handelUpdateForm('firstName', value)}
              value={form.firstName}
            />

            <FormText
              name="lastName"
              placeholder="Lat name..."
              onChange={(value) => handelUpdateForm('lastName', value)}
              value={form.lastName}
            />
          </fieldset>

          <FormText
            name="address"
            value={form.address}
            onChange={(value) => handelUpdateForm('address', value)}
            label="Address"
            placeholder="Enter your address..."
          />
          <FormText
            value={form.email}
            onChange={(value) => handelUpdateForm('email', value)}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email address..."
          />
          <FormText
            name="birthDate"
            onChange={(value) => handelUpdateForm('birthDate', value)}
            value={form.birthDate}
            label="Birth date"
            type="date"
            placeholder="DD/MM/YY"
          />
          <FormText
            name="description"
            onChange={(value) => handelUpdateForm('description', value)}
            value={form.description}
            label="Describe yourself"
            type="textarea"
            placeholder="Describe yourself..."
          />
          <FormDropzone
            value={file}
            onFileUpload={(value) => setFile(value as File)}
            label="Upload your document"
          />
          <Btn size="sm" className="justify-center w-full lg:mt-4">
            <span>Submit</span>
          </Btn>
        </form>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 cursor-pointer"
        onClick={close}
      />
    </div>
  );
};

export default JobApplicationForm;
