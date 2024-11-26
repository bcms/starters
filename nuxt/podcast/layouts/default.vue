<template>
    <div class="overflow-hidden flex flex-col min-h-screen">
        <LayoutHeader />
        <main class="flex flex-col flex-1">
            <slot />
        </main>
        <LayoutFooter />
        <LayoutPlayingEpisode v-if="$route.name !== 'now-playing' && data" :bcms="data.bcms" />
    </div>
</template>

<script setup lang="ts">
import type { BCMSConfigResponse } from '~/server/api/bcms-config';

const { data, error } = await useFetch<BCMSConfigResponse>('/api/bcms-config');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Config Not Found',
    });
}
</script>