<template>
    <section class="relative pb-8 lg:pb-20 xl:pb-[120px]">
        <div class="container">
            <div
                class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20 lg:items-center xl:gap-[114px] xl:pr-20"
            >
                <div
                    class="flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                    <h2
                        class="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-4xl lg:leading-none lg:mb-6"
                    >
                        {{ title }}
                    </h2>
                    <ContentManager
                        :items="description.nodes"
                        class="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 mb-6 lg:text-lg lg:leading-normal lg:mb-14"
                    />
                    <div class="grid grid-cols-1 gap-5 lg:gap-10">
                        <div class="flex flex-col items-center lg:items-start">
                            <div class="flex items-center mb-2 lg:mb-4">
                                <SvgoPhone
                                    filled
                                    :font-controlled="false"
                                    class="w-3 h-3 mr-1.5 lg:w-[18px] lg:h-[18px]"
                                />
                                <div
                                    class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 lg:text-lg lg:leading-none"
                                >
                                    Telephone
                                </div>
                            </div>
                            <p
                                class="text-sm leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-2xl lg:leading-none"
                            >
                                <a href="tel:(+1) 812 91831" target="_blank"
                                    >(+1) 812 91831</a
                                >
                            </p>
                        </div>
                        <div class="flex flex-col items-center lg:items-start">
                            <div class="flex items-center mb-2 lg:mb-4">
                                <SvgoEmail
                                    filled
                                    :font-controlled="false"
                                    class="w-3 h-3 mr-1.5 lg:w-[18px] lg:h-[18px]"
                                />
                                <div
                                    class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 lg:text-lg lg:leading-none"
                                >
                                    Email
                                </div>
                            </div>
                            <p
                                class="text-sm leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-2xl lg:leading-none"
                            >
                                <a
                                    href="mailto:flavourfus@gmail.com"
                                    target="_blank"
                                    >Flavourfus@gmail.com</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
                <form
                    class="border border-[#E0E0E0] rounded-lg p-4 lg:p-8"
                    @submit.prevent="handleSubmit"
                >
                    <label
                        class="relative flex border rounded-lg overflow-hidden w-full mb-3 transition-colors duration-300 lg:mb-6"
                        :class="[
                            form.name.error
                                ? 'border-red-500'
                                : 'border-[#F0F0F0]',
                        ]"
                    >
                        <input
                            v-model="form.name.value"
                            type="text"
                            class="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none"
                        />
                        <span
                            v-if="!form.name.value"
                            class="absolute top-1/2 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none"
                        >
                            Full name<span class="text-appWarning">*</span>
                        </span>
                    </label>
                    <label
                        class="relative flex border rounded-lg overflow-hidden w-full mb-3 transition-colors duration-300 lg:mb-6"
                        :class="[
                            form.name.error
                                ? 'border-red-500'
                                : 'border-[#F0F0F0]',
                        ]"
                    >
                        <input
                            v-model="form.email.value"
                            type="email"
                            class="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none"
                        />
                        <span
                            v-if="!form.email.value"
                            class="absolute top-1/2 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none"
                        >
                            Email<span class="text-appWarning">*</span>
                        </span>
                    </label>
                    <label
                        class="relative flex border rounded-lg overflow-hidden w-full mb-6 transition-colors duration-300 lg:mb-8"
                        :class="[
                            form.name.error
                                ? 'border-red-500'
                                : 'border-[#F0F0F0]',
                        ]"
                    >
                        <textarea
                            v-model="form.question.value"
                            class="w-full text-xs leading-none tracking-[-0.41px] font-medium px-4 py-[14px] resize-none h-[140px] focus:outline-none lg:px-6 lg:py-[15px] lg:text-base lg:leading-none lg:h-[260px]"
                        />
                        <span
                            v-if="!form.question.value"
                            class="absolute top-5 left-4 -translate-y-1/2 text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 pointer-events-none lg:left-6 lg:text-base lg:leading-none lg:top-6"
                        >
                            Question<span class="text-appWarning">*</span>
                        </span>
                    </label>
                    <Btn theme="dark" class="justify-center w-full">
                        <span>Submit</span>
                    </Btn>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PropRichTextDataParsed } from '@thebcms/types';

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
});

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
