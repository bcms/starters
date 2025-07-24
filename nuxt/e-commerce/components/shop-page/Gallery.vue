<template>
    <div class="flex flex-col">
        <div class="aspect-square overflow-hidden mb-6">
            <BcmsImage
                v-for="(image, index) in galleryByColor"
                :key="image.image._id"
                :media="image.image"
                :class="`size-full object-cover flex-1 ${activeImage === index ? 'flex' : 'hidden'}`"
            />
        </div>
        <div class="flex gap-4 overflow-x-auto">
            <button
                v-for="(image, index) in galleryByColor"
                :key="image.image._id"
                class="group flex flex-shrink-0 w-[124px] aspect-square border p-2 transition-colors duration-300"
                :class="[
                    index === activeImage
                        ? 'border-appText'
                        : 'border-appGray-300',
                ]"
                @click="activeImage = index"
            >
                <div class="overflow-hidden">
                    <BcmsImage
                        :media="image.image"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductColorEntry, ProductImageGroup } from '~/bcms/type/ts';

const props = defineProps({
    gallery: {
        type: Array as PropType<ProductImageGroup[]>,
        required: true,
    },
    activeColor: {
        type: Object as PropType<ProductColorEntry>,
        required: true,
    },
});

const activeImage = ref(0);

const galleryByColor = computed(() => {
    return props.gallery.filter(
        (e) => e.color.meta.en?.slug === props.activeColor.meta.en?.slug,
    );
});

watch(
    () => props.activeColor,
    () => {
        activeImage.value = 0;
    },
);
</script>
