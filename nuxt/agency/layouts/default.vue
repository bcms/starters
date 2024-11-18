<template>
    <div class="overflow-hidden flex flex-col min-h-screen">
        <LayoutHeader />
        <main class="flex flex-col flex-1">
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>
