<template>
    <form
        class="md:grid md:grid-cols-2 md:gap-x-[72px]"
        @submit.prevent="handleSubmit"
    >
        <FormText
            v-model="me.phone"
            label="Phone number"
            is-read-only
            class="mb-5"
        />
        <FormText
            v-model="me.email"
            type="email"
            label="Email"
            is-read-only
            class="mb-8 md:mb-14 lg:mb-16"
        />
        <div
            class="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica mb-8 md:col-span-2 md:text-2xl md:mb-10 lg:text-[40px] lg:leading-[1.2]"
        >
            To reach out to me, <br />
            please fill in the form below.
        </div>
        <FormText
            v-model="form.name.value"
            :error="form.name.error"
            label="Fill your name"
            placeholder="Full name"
            class="mb-5 lg:mb-4"
        />
        <FormText
            v-model="form.email.value"
            :error="form.email.error"
            type="email"
            label="Fill your email"
            placeholder="Email address"
            class="mb-5 lg:mb-4"
        />
        <FormText
            v-model="form.message.value"
            :error="form.message.error"
            label="Write me a message"
            placeholder="Write me a message"
            class="mb-8 md:col-span-2"
        />
        <button
            type="button"
            class="flex items-center justify-center px-4 py-[9px] border rounded-[32px] text-white border-appText bg-appText max-w-max lg:px-7 lg:py-3"
            @click="handleSubmit"
        >
            <span>Submit</span>
        </button>
    </form>
</template>

<script setup lang="ts">
const { checkForInputErrors } = useErrors();

const me = ref({
    phone: '(+1) 734 8123 8162',
    email: 'qwerty@mail.com',
});

const form = ref({
    name: {
        value: '',
        error: '',
    },
    email: {
        value: '',
        error: '',
    },
    message: {
        value: '',
        error: '',
    },
});

const handleSubmit = () => {
    const errors = checkForInputErrors([
        form.value.name,
        form.value.email,
        form.value.message,
    ]);

    if (!errors) {
        // TODO: Submit
    }
};
</script>
