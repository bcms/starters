<template>
    <footer class="bg-appGray-200 pt-[72px]">
        <div class="container">
            <nav
                class="grid grid-cols-1 gap-[55px] pb-14 border-b border-[#ccc] md:grid-cols-2 lg:grid-cols-4"
            >
                <div
                    v-for="(col, index) in nav"
                    :key="index"
                    class="footer--col"
                >
                    <p class="text-lg leading-none mb-4 md:text-xl md:mb-8">
                        {{ col.label }}
                    </p>
                    <ul class="grid grid-cols-1 gap-6">
                        <li
                            v-for="(colItem, itemIndex) in col.items"
                            :key="itemIndex"
                            class="text-xl leading-none md:text-2xl"
                        >
                            <NuxtLink
                                :to="colItem.to"
                                class="hover:underline"
                                >{{ colItem.label }}</NuxtLink
                            >
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="py-10">
                <a
                    href="https://thebcms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-1.5"
                >
                    <span class="leading-none tracking-[-0.41px] text-gray-700">
                        Powered by
                    </span>
                    <img
                        src="/logo-dark.png"
                        alt="BCMS"
                        class="w-[60px] lg:w-[83px]"
                    />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const nav = [
    {
        label: 'Navigation',
        items: [
            {
                label: 'Shop',
                to: '/shop',
            },
            {
                label: 'Blog',
                to: '/blog',
            },
        ],
    },
    {
        label: 'Customer care',
        items: [
            {
                label: 'Shipping',
                to: '/legal',
            },
            {
                label: 'Terms and conditions',
                to: '/legal',
            },
            {
                label: 'Privacy and policy',
                to: '/legal',
            },
        ],
    },
    {
        label: 'Contact',
        items: [
            {
                label: '+1 823 1923 123',
                to: 'tel:18231923123',
            },
            {
                label: 'modawear@mail.com',
                to: 'mailto:modawear@mail.com',
            },
        ],
    },
    {
        label: 'Social media',
        items: [
            {
                label: 'Instagram',
                to: 'https://www.instagram.com',
            },
            {
                label: 'X',
                to: 'https://x.com/',
            },
            {
                label: 'Facebook',
                to: 'https://www.facebook.com/',
            },
        ],
    },
];
</script>
