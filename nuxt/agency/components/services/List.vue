<template>
  <section class="mb-8 md:mb-14 lg:mb-20 xl:mb-32">
    <div class="container">
      <div class="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
        <template v-for="(service, index) in services">
          <div
            v-if="service.meta.en"
            :key="index"
            class="grid min-h-[340px] rounded-2xl overflow-hidden lg:h-[518px]"
            :class="[
              index % 2 === 0
                ? 'grid-cols-[37.5%,62.5%]'
                : 'grid-cols-[62.5%,37.5%] lg:grid-cols-[50.5%,49.5%]',
            ]"
            :style="{
              boxShadow:
                '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
            }"
          >
            <BCMSImage
              :media="service.meta.en.cover"
              :options="{
                sizes: {
                  exec:
                    index % 2 === 0
                      ? [
                          {
                            width: 960,
                            height: 1036,
                          },
                        ]
                      : [
                          {
                            width: 1272,
                            height: 1036,
                          },
                        ],
                },
              }"
              class="full"
              :class="[index % 2 === 0 ? '' : 'order-2']"
            />
            <div
              class="flex flex-col justify-between text-appText-light p-4 pr-8 lg:p-8"
              :style="{
                background: service.meta.en.theme,
              }"
            >
              <h2
                class="text-sm font-bold leading-tight tracking-[-0.28px] max-w-[540px] mb-14 lg:text-2xl lg:leading-none lg:font-bold lg:tracking-[-0.64px] lg:mb-[200px]"
              >
                {{ service.meta.en.title }}
              </h2>
              <ContentManager
                :item="service.meta.en.description"
                class="text-xs leading-tight tracking-[-0.24px] max-w-[90%] lg:text-base lg:leading-tight lg:tracking-[-0.32px]"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { ServiceEntry } from '~~/bcms/types';

defineProps({
  services: {
    type: Array as PropType<ServiceEntry[]>,
    required: true,
  },
});
</script>
