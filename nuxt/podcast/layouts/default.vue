<template>
    <div class="overflow-hidden flex flex-col min-h-screen">
        <LayoutHeader />
        <main class="flex flex-col flex-1">
            <slot />
        </main>
        <LayoutFooter />
        <LayoutPlayingEpisode v-if="$route.name !== 'now-playing'" />
    </div>
</template>

<script setup lang="ts"></script>
