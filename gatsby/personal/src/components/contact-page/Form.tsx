import React, { useState } from 'react';
import FormText from './Text';

interface ContactForm {
    phone: string;
    fullName: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
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

    const me = {
        phone: '(+1) 734 8123 8162',
        email: 'qwerty@mail.com',
    };

    const handleUpdateForm = (
        field: keyof ContactForm,
        value: string,
    ): void => {
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
        <form className="md:grid md:grid-cols-2 md:gap-x-[72px]">
            <FormText
                value={me.phone}
                label="Phone number"
                className="mb-5"
                isReadOnly={true}
                onChange={(value) => handleUpdateForm('phone', value)}
            />
            <FormText
                value={me.email}
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
    );
};

export default ContactForm;
