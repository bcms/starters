<template>
    <section class="pb-8 md:pb-20 lg:pb-[108px]">
        <div class="container max-w-[1136px]">
            <div
                class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-20"
            >
                <form
                    class="grid grid-cols-1 gap-4 lg:gap-8"
                    @submit.prevent="handleSubmit"
                >
                    <FormText
                        v-model="form.name.value"
                        :error="form.name.error"
                        label="What’s your name"
                        placeholder="Enter your name"
                    />
                    <FormText
                        v-model="form.email.value"
                        :error="form.email.error"
                        type="email"
                        label="What’s your email address"
                        placeholder="Enter your email"
                    />
                    <FormText
                        v-model="form.question.value"
                        :error="form.question.error"
                        type="textarea"
                        label="What’s your question"
                        placeholder="Your message..."
                    />
                    <button
                        type="submit"
                        class="flex justify-center w-full bg-appText text-white px-5 py-3 rounded-[32px] leading-none tracking-[-0.41px] max-lg:mt-4 lg:text-2xl lg:leading-none lg:py-4"
                    >
                        Submit
                    </button>
                </form>
                <div class="flex justify-center">
                    <a
                        :href="`mailto:insightfulink@mail.com`"
                        class="relative flex items-center justify-center w-[227px] aspect-square rounded-full lg:w-[400px]"
                    >
                        <div class="relative z-10 flex flex-col items-center">
                            <SvgoEmail
                                filled
                                :font-controlled="false"
                                class="w-8 h-8 mb-2 lg:w-12 lg:h-12 lg:mb-6"
                            />
                            <div
                                class="leading-none font-medium tracking-[-0.41px] text-white lg:text-xl lg:leading-none"
                            >
                                insightfulink@mail.com
                            </div>
                        </div>
                        <img
                            src="@/assets/media/email-bg.png"
                            alt="Bg"
                            class="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                        />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { checkForInputErrors } = useErrors();

const form = ref({
    name: {
        value: '',
        error: '',
    },
    email: {
        value: '',
        error: '',
    },
    question: {
        value: '',
        error: '',
    },
});

const handleSubmit = () => {
    const errors = checkForInputErrors([
        form.value.name,
        form.value.email,
        form.value.question,
    ]);

    if (!errors) {
        // TODO: Submit
    }
};
</script>
