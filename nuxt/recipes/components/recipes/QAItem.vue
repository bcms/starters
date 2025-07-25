<template>
    <div class="border border-[#E8E8E8] rounded-lg">
        <button
            class="flex items-center justify-between px-[14px] py-4 w-full text-left lg:px-6 lg:py-5"
            @click="showAnswer = !showAnswer"
        >
            <span
                class="text-xs leading-none font-semibold text-appGray-700 tracking-[-0.41px] lg:text-base lg:leading-none"
            >
                {{ item.question }}
            </span>
            <SvgoChevronDown
                filled
                :font-controlled="false"
                class="w-4 h-4 transition-transform duration-300"
                :class="[showAnswer ? 'rotate-180' : '']"
            />
        </button>
        <ContentManager
            v-if="showAnswer"
            :items="item.answer.nodes"
            class="px-[14px] pb-[18px] -mt-1 text-sm leading-[1.55] tracking-[-0.41px] text-appGray-500 lg:px-6 lg:pb-5 lg:text-lg"
        />
    </div>
</template>

<script setup lang="ts">
import type { QaItemGroup } from '~/bcms/type/ts';

defineProps({
    item: {
        type: Object as PropType<QaItemGroup>,
        required: true,
    },
});

const showAnswer = ref(false);
</script>
