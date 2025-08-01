<template>
    <div class="mb-8 lg:mb-20 xl:mb-[120px]">
        <h2
            class="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6 lg:text-2xl lg:leading-none lg:mb-10"
        >
            Steps
        </h2>
        <div
            class="border border-[#E8E8E8] rounded-md p-4 pb-6 mb-6 lg:p-6 lg:pb-8 lg:rounded-xl lg:mb-12"
        >
            <div
                v-for="(step, index) in steps"
                :key="index"
                class="mb-5 lg:mb-10"
                :class="[
                    activeStep !== index
                        ? 'absolute opacity-0 pointer-events-none'
                        : '',
                ]"
            >
                <BcmsImage
                    :media="step.cover"
                    class="aspect-[1.475] rounded-md overflow-hidden object-cover w-full mb-4 lg:aspect-[2.2] lg:rounded-xl lg:mb-10"
                />
                <div
                    class="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-2xl lg:leading-none lg:mb-6"
                >
                    {{ step.title }}
                </div>
                <ContentManager
                    :items="step.description.nodes"
                    class="text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] lg:text-lg lg:leading-[1.55]"
                />
            </div>
            <div class="flex items-center gap-2.5 lg:gap-[14px]">
                <button
                    v-for="(_, index) in steps.length"
                    :key="index"
                    class="flex flex-1 h-1 transition-colors duration-300 lg:h-2 lg:rounded-sm"
                    :class="[
                        index <= activeStep ? 'bg-appAccent' : 'bg-[#EBEBEB]',
                    ]"
                    @click="activeStep = index"
                />
            </div>
        </div>
        <div
            class="grid grid-cols-2 gap-2.5 lg:max-w-[424px] lg:mx-auto lg:gap-6"
        >
            <Btn
                theme="gray"
                :disabled="activeStep === 0"
                class="justify-center"
                @click="activeStep--"
            >
                <SvgoArrowRight
                    filled
                    :font-controlled="false"
                    class="w-[14px] h-[14px] mr-2 rotate-180 lg:w-5 lg:h-5"
                />
                <span>Previous</span>
            </Btn>
            <Btn
                theme="gray"
                :disabled="activeStep === steps.length - 1"
                class="justify-center"
                @click="activeStep++"
            >
                <span class="mr-2">Next</span>
                <SvgoArrowRight
                    filled
                    :font-controlled="false"
                    class="w-[14px] h-[14px] lg:w-5 lg:h-5"
                />
            </Btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RecipeStepGroup } from '~/bcms/type/ts';

defineProps({
    steps: {
        type: Array as PropType<RecipeStepGroup[]>,
        required: true,
    },
});

const activeStep = ref(0);
</script>
