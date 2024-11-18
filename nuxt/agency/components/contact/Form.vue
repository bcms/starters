<template>
    <section>
        <div class="container">
            <form
                class="grid grid-cols-2 gap-3 lg:gap-4"
                @submit.prevent="handleSubmit"
            >
                <FormText
                    v-model="form.name.value"
                    placeholder="Fill your name..."
                    :error="form.name.error"
                />
                <FormText
                    v-model="form.email.value"
                    type="email"
                    placeholder="Fill your email..."
                    :error="form.email.error"
                />
                <FormText
                    v-model="form.message.value"
                    type="textarea"
                    placeholder="Your message..."
                    :error="form.message.error"
                    class="col-span-2"
                />
                <button
                    class="bg-appAccent-300 flex max-w-max px-6 py-3 rounded-[7px] text-appText-light font-Inter text-sm font-medium leading-none tracking-[-0.28px] mt-1 transition-colors duration-300 hover:bg-appAccent lg:mt-2"
                >
                    Send
                </button>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
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
    if (!form.value.name.value) {
        form.value.name.error = 'Name is required';
        return;
    }
    form.value.name.error = '';

    if (!form.value.email.value) {
        form.value.email.error = 'Email is required';
        return;
    }
    form.value.email.error = '';

    if (!form.value.message.value) {
        form.value.message.error = 'Message is required';
        return;
    }
    form.value.message.error = '';
};
</script>
