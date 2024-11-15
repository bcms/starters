<template>
    <div class="relative" ref="mapRef">
        <button
            class="flex text-xs leading-none text-appGray-400 hover:underline lg:text-sm lg:leading-none"
            :class="[showMap ? 'underline' : '']"
            @click="showMap = !showMap"
        >
            Open maps
        </button>
        <Transition name="fade">
            <div
                v-if="showMap"
                v-click-outside="() => (showMap = false)"
                class="absolute z-50 bottom-0 w-[calc(100vw-48px)] pointer-events-none"
            >
                <div
                    class="relative z-10 top-4 translate-y-full bg-[#E5E4DA] rounded-2xl p-4 pb-6 xl:p-2 xl:w-[440px]"
                >
                    <BCMSImage
                        :media="map"
                        :client="bcms"
                        class="w-full h-auto object-cover rounded-[10px] overflow-hidden pointer-events-auto"
                    />
                    <div
                        class="grid grid-cols-2 gap-3 mt-6 pointer-events-auto xl:hidden"
                    >
                        <Btn
                            theme="fill"
                            hide-arrow
                            class="justify-center uppercase"
                            @click="showMap = false"
                        >
                            <span class="text-appText">Close</span>
                        </Btn>
                        <Btn
                            hide-arrow
                            class="justify-center uppercase"
                            @click="showMap = false"
                        >
                            <span>Open maps</span>
                        </Btn>
                    </div>
                </div>
                <div
                    class="fixed top-0 left-0 w-screen h-screen bg-[#17171799] cursor-pointer xl:hidden"
                    @click="showMap = false"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { PropMediaDataParsed } from '@thebcms/types';

defineProps({
    map: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});

const showMap = ref(false);

const mapRef = ref<HTMLElement>();

watch(showMap, (val) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (mapRef.value && !mapRef?.value.contains(event.target as Node)) {
            showMap.value = false;
        }
    };

    if (showMap) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }
});
</script>
