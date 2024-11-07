<template>
    <header>
        <div class="container">
            <nav
                class="flex items-center justify-between pt-6 pb-8 lg:pt-12 lg:pb-[72px]"
            >
                <NuxtLink to="/" class="flex" aria-label="Home page">
                    <SvgoLogo
                        filled
                        :font-controlled="false"
                        class="w-[140px]"
                    />
                </NuxtLink>
                <ul class="flex items-center space-x-4 lg:space-x-10">
                    <li v-for="(item, index) in nav" :key="index">
                        <button
                            v-if="item.onClick"
                            @click="item.onClick"
                            class="flex text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
                        >
                            {{ item.label }}
                        </button>
                        <NuxtLink
                            v-else
                            :to="item.href"
                            class="flex text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-xl lg:leading-none"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        <ContactForm v-if="showContactForm" @close="showContactForm = false" />
    </header>
</template>

<script setup lang="ts">
const showContactForm = ref(false);

const nav = [
    {
        label: 'Contact us',
        onClick: () => {
            showContactForm.value = true;
        },
    },
    {
        label: 'Ticket',
        href: '#ticket',
    },
];
</script>
