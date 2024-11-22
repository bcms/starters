<template>
    <footer class="bg-black py-8 lg:py-14">
        <div class="container">
            <div class="flex flex-col items-center">
                <div
                    class="flex items-center justify-center space-x-8 mb-14 lg:space-x-[74px] lg:mb-[72px]"
                >
                    <a
                        v-for="(item, index) in socials"
                        :key="index"
                        :href="item.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="item.label"
                    >
                        <component
                            :is="item.icon"
                            filled
                            :font-controlled="false"
                            class="w-6 h-6 lg:w-8 lg:h-8"
                        />
                    </a>
                </div>
                <div
                    class="flex flex-col text-appGray-100 lg:flex-row lg:w-full lg:justify-between"
                >
                    <div
                        class="flex items-center space-x-1.5 text-sm leading-none tracking-[-0.41px] max-lg:mb-4 lg:text-base lg:leading-none lg:order-3"
                    >
                        <NuxtLink :to="`mailto:CONfere@mail.com`" class="flex">
                            CONfere@mail.com
                        </NuxtLink>
                        <div
                            class="w-[3px] h-[3px] rounded-full bg-appGray-100"
                        />
                        <button @click="showLegalModal = true">
                            Legal page
                        </button>
                    </div>
                    <div
                        class="flex items-end text-xs leading-none tracking-[-0.41px] max-lg:mb-8 lg:text-base lg:leading-none lg:order-1"
                    >
                        &copy; {{ new Date().getFullYear() }} CONference. All
                        rights reserved
                    </div>
                    <a
                        href="https://thebcms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center lg:order-2"
                    >
                        <span
                            class="text-sm leading-none font-medium tracking-[-0.41px] mr-2 lg:text-base lg:leading-none lg:mr-1.5"
                        >
                            Powered by
                        </span>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            class="w-[55px] lg:w-[83px]"
                        />
                    </a>
                </div>
            </div>
        </div>
        <LegalModal
            v-if="showLegalModal"
            :legal="legal"
            @close="showLegalModal = false"
        />
    </footer>
</template>

<script setup lang="ts">
import type { LegalEntry } from '~/bcms/types/ts';
import FacebookIcon from '@/assets/icons/facebook.svg';
import RedditIcon from '@/assets/icons/reddit.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import TwitterXIcon from '@/assets/icons/twitter-x.svg';
import SnapchatIcon from '@/assets/icons/snapchat.svg';

defineProps({
    legal: {
        type: Array as PropType<LegalEntry[]>,
        required: true,
    },
});

const socials = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/',
        icon: FacebookIcon,
    },
    {
        label: 'Reddit',
        href: 'https://www.reddit.com',
        icon: RedditIcon,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/',
        icon: InstagramIcon,
    },
    {
        label: 'X',
        href: 'https://x.com/',
        icon: TwitterXIcon,
    },
    {
        label: 'Snapchat',
        href: 'https://www.snapchat.com/',
        icon: SnapchatIcon,
    },
];

const showLegalModal = ref(false);
</script>
