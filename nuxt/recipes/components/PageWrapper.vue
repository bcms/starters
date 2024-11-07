<template>
    <div>
        <LayoutHeader :data="header" :bcms="bcms" />
        <main>
            <slot />
        </main>
        <LayoutFooter :data="footer" :bcms="bcms" />
    </div>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import type { FooterEntryMetaItem, HeaderEntryMetaItem } from '~/bcms/types/ts';

defineProps({
    header: {
        type: Object as PropType<HeaderEntryMetaItem>,
        required: true,
    },
    footer: {
        type: Object as PropType<FooterEntryMetaItem>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
