<template>
    <footer class="pb-6">
        <div class="container">
            <div class="bg-appAccent p-5 pb-6 rounded-2xl lg:p-10">
                <div
                    class="pb-5 border-b border-[#B2CF81] mb-4 md:flex md:items-start md:justify-between md:pb-10 md:mb-6 lg:pb-20 lg:mb-8"
                >
                    <div
                        class="leading-[1.16] font-semibold tracking-[-0.6px] max-w-[171px] mb-2.5 md:text-2xl md:max-w-[350px] lg:text-[40px] lg:leading-[1.12] lg:tracking-[-2.41px] lg:max-w-[420px] xl:text-[56px] xl:leading-[1.12] xl:max-w-[591px]"
                    >
                        My Memorable Journey Straight To Your Inbox
                    </div>
                    <p
                        class="text-sm leading-[1.2] tracking-[-0.6px] font-medium max-w-[237px] md:text-base md:leading-[1.2] md:max-w-[270px] lg:text-xl lg:leading-[1.2] lg:tracking-[-0.41px] lg:max-w-[350px] xl:text-2xl xl:leading-[1.2] xl:max-w-[469px]"
                    >
                        Sign up to my weekly newsletter to be the first to know
                        my journey updates
                    </p>
                </div>
                <div
                    class="md:flex md:items-center md:justify-between md:gap-20"
                >
                    <form
                        class="flex items-center bg-white pl-[14px] pr-2 rounded-[48px] max-md:mb-6 md:pl-[18px] lg:w-full lg:max-w-[600px]"
                        @submit.prevent="handleSubmit"
                    >
                        <SvgoMailgun
                            filled
                            :font-controlled="false"
                            class="w-4 h-4 flex-shrink-0 md:w-5 md:h-5"
                        />
                        <label class="w-full flex-1">
                            <input
                                v-model="email"
                                type="email"
                                placeholder="Enter your email"
                                class="bg-transparent px-3 py-3 w-full text-sm leading-none tracking-[-0.41px] placeholder:text-appText focus:outline-none md:text-base md:leading-none md:py-[19px]"
                            />
                        </label>
                        <button
                            type="submit"
                            aria-label="Submit"
                            class="flex items-center justify-center w-6 h-6 bg-appText rounded-full flex-shrink-0 md:w-10 md:h-10"
                        >
                            <SvgoPaperPlane
                                filled
                                :font-controlled="false"
                                class="w-2.5 h-2.5 md:w-4 md:h-4"
                            />
                        </button>
                    </form>
                    <div
                        class="grid grid-cols-2 justify-items-center gap-4 md:flex md:items-center lg:gap-6"
                    >
                        <NuxtLink
                            v-for="(link, index) in socials"
                            :key="index"
                            :to="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="link.label"
                            class="flex items-center justify-center w-[135px] rounded-full bg-appText aspect-square md:w-[54px]"
                        >
                            <component
                                :is="link.icon"
                                filled
                                :font-controlled="false"
                                class="w-10 h-10 md:w-6 md:h-6"
                            />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import FacebookIcon from '@/assets/icons/facebook.svg';
import PinterestIcon from '@/assets/icons/pinterest.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import TwitterXIcon from '@/assets/icons/twitter-x.svg';

const socials = [
    {
        label: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: FacebookIcon,
    },
    {
        label: 'Pinterest',
        url: 'https://www.pinterest.com/',
        icon: PinterestIcon,
    },
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/',
        icon: InstagramIcon,
    },
    {
        label: 'X',
        url: 'https://www.twitter.com/',
        icon: TwitterXIcon,
    },
];

const email = ref('');
const handleSubmit = () => {
    // TODO: Send email
};
</script>
