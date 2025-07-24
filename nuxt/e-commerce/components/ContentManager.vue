<template>
    <BcmsContentManager
        ref="managerDOM"
        :items="items"
        :widget-components="widgetComponents"
    />
</template>

<script setup lang="ts">
import type { EntryContentParsedItem } from '@thebcms/types';

defineProps({
    items: {
        type: Array as PropType<EntryContentParsedItem[]>,
        required: true,
    },
    widgetComponents: {
        type: Object,
        required: false,
        default: () => {
            return {};
        },
    },
});

const managerDOM = ref<any>();

const parseInternalLinks = () => {
    if (managerDOM.value.$el) {
        setTimeout(() => {
            const links = managerDOM.value.$el.querySelectorAll('a');

            links.forEach((link: HTMLAnchorElement) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('/')) {
                    link.target = '_self';
                    link.addEventListener('click', (event) => {
                        event.preventDefault();

                        navigateTo(href);
                    });
                }
            });
        }, 0);
    }
};

onMounted(() => {
    parseInternalLinks();
});
</script>
