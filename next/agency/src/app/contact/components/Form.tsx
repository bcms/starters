'use client';

import React, { useState, useRef } from 'react';
import FormText from './Text';

const Form = () => {
    const [form, setForm] = useState({
        name: { value: '', error: '' },
        email: { value: '', error: '' },
        message: { value: '', error: '' },
    });
    const formRef = useRef(null);

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: { value, error: '' } });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let hasErrors = false;
        const newForm = { ...form };

        if (!newForm.name.value) {
            newForm.name.error = 'Name is required';
            hasErrors = true;
        }

        if (!newForm.email.value) {
            newForm.email.error = 'Email is required';
            hasErrors = true;
        }

        if (!newForm.message.value) {
            newForm.message.error = 'Email is required';
            hasErrors = true;
        }

        if (hasErrors) {
            setForm(newForm);
            return;
        }
    };

    return (
        <section>
            <div className="container">
                <form
                    className="grid grid-cols-2 gap-3 lg:gap-4"
                    onSubmit={handleSubmit}
                    ref={formRef}
                >
                    <FormText
                        value={form.name.value}
                        onChange={handleChange}
                        placeholder="Fill your name..."
                        error={form.name.error}
                        name="name"
                    />
                    <FormText
                        value={form.email.value}
                        onChange={handleChange}
                        type="email"
                        placeholder="Fill your email..."
                        error={form.email.error}
                        name="email"
                    />
                    <FormText
                        value={form.message.value}
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Your message..."
                        error={form.message.error}
                        name="message"
                        className="col-span-2"
                    />
                    <button className="bg-appAccent-300 flex max-w-max px-6 py-3 rounded-[7px] text-appText-light font-Inter text-sm font-medium leading-none tracking-[-0.28px] mt-1 transition-colors duration-300 hover:bg-appAccent lg:mt-2">
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Form;
