<template>
    <div>
        <LayoutHeader :data="header" />
        <main>
            <slot />
        </main>
        <LayoutFooter :data="footer" />
    </div>
</template>

<script setup lang="ts">
import type { FooterEntryMetaItem, HeaderEntryMetaItem } from '~/bcms/type/ts';

defineProps({
    header: {
        type: Object as PropType<HeaderEntryMetaItem>,
        required: true,
    },
    footer: {
        type: Object as PropType<FooterEntryMetaItem>,
        required: true,
    },
});
</script>
