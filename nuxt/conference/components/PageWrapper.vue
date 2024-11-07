<template>
    <div class="overflow-hidden flex flex-col min-h-screen">
        <LayoutHeader />
        <div class="flex flex-col flex-1"><slot /></div>
        <LayoutFooter :legal="legal" />
    </div>
</template>

<script setup lang="ts">
import type { LegalEntry } from '~/bcms/types/ts';

defineProps({
    legal: {
        type: Array as PropType<LegalEntry[]>,
        required: true,
    },
});
</script>
