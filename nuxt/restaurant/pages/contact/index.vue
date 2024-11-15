<template>
    <div v-if="data">
        <section
            class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
        >
            <div class="container max-w-[1198px]">
                <ArchWithStar />
                <div
                    class="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0"
                >
                    <h1
                        class="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20"
                    >
                        {{ data.meta.title }}
                    </h1>
                    <ContentManager
                        :items="data.meta.description.nodes"
                        class="contactPage--description text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
                    />
                    <div class="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
                        <BCMSImage
                            :media="data.meta.map_image"
                            :client="data.bcms"
                            class="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
                        />
                    </div>
                    <Btn
                        to="https://www.google.com/maps"
                        target="_blank"
                        class="uppercase max-w-max mx-auto"
                    >
                        <span>Open maps</span>
                    </Btn>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { ContactPageResponse } from '~/server/api/contact-page';

const { setOgHead } = useHeadTags();

const { data, error } =
    await useFetch<ContactPageResponse>('/api/contact-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

useHead(() =>
    setOgHead({
        title: `${data.value?.meta.seo?.title || data.value?.meta.title} - Tastyyy`,
        description: data.value?.meta.seo?.description,
    }),
);
</script>
