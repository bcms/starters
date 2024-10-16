'use client';

import Button from '@/components/Btn';
import FormText from '@/components/form/Text';
import React, { FormEvent, useState } from 'react';

interface Form {
    fullName: string;
    email: string;
    phoneNumber: string;
    details: string;
}

const Form: React.FC = () => {
    const [form, setForm] = useState<Form>({
        email: '',
        fullName: '',
        phoneNumber: '',
        details: '',
    });

    const handleFormChange = (name: string, value: string): void => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // TODO: Handle form submission
    };

    return (
        <form
            className="grid grid-cols-1 gap-6 bg-[#E3E1DC] border border-[#B0AEAB] rounded-[14px] p-6 lg:p-8"
            onSubmit={handleSubmit}
        >
            <FormText
                value={form.fullName}
                label="Full name"
                name="fullName"
                placeholder="Enter your full name"
                onChange={(value) => handleFormChange('fullName', value)}
            />
            <FormText
                value={form.email}
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                onChange={(value) => handleFormChange('email', value)}
            />
            <FormText
                value={form.phoneNumber}
                name="phoneNumber"
                label="Phone number"
                placeholder="Enter your phone number"
                onChange={(value) => handleFormChange('phoneNumber', value)}
            />
            <FormText
                value={form.details}
                type="textarea"
                label="How can we help you?"
                name="details"
                placeholder="Give us details on how we can help you..."
                onChange={(value) => handleFormChange('details', value)}
            />
            <Button className="justify-center w-full lg:mt-4">
                <span>Submit</span>
            </Button>
        </form>
    );
};

export default Form;
