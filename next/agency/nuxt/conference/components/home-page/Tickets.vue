<template>
  <section id="tickets" class="pb-16 scroll-m-5 lg:pb-[130px]">
    <div class="container">
      <div
        class="leading-none tracking-[-0.02em] font-semibold text-center mb-3 lg:text-5xl lg:leading-none lg:mb-4"
      >
        {{ data.title }}
      </div>
      <ContentManager
        :item="data.description"
        class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-500 text-center max-w-[823px] mx-auto mb-10 lg:text-2xl lg:leading-none lg:mb-16"
      />
      <div class="grid grid-cols-1 gap-4 lg:gap-16">
        <button
          v-for="(ticket, index) in data.tickets"
          :key="index"
          class="relative flex rounded-lg overflow-hidden p-[15px] text-left lg:rounded-3xl lg:p-14"
        >
          <div class="relative z-10 w-full">
            <div
              class="text-sm leading-none tracking-[-0.02em] font-semibold mb-10 lg:text-[40px] lg:leading-none lg:mb-[208px]"
              :class="[ticket.theme.selected === 'LIGHT' ? 'text-white' : '']"
            >
              {{ ticket.title }}
            </div>
            <div class="flex items-end justify-between">
              <div class="flex items-end">
                <div
                  class="text-2xl leading-none mr-1 tracking-[-0.04em] font-semibold lg:text-[88px] lg:leading-none lg:mr-4"
                  :class="[
                    ticket.theme.selected === 'LIGHT' ? 'text-white' : '',
                  ]"
                >
                  ${{ ticket.price }}
                </div>
                <div
                  v-if="ticket.discount_price"
                  class="text-sm leading-none tracking-[-0.04em] font-medium line-through opacity-50 lg:text-5xl lg:leading-none"
                  :class="[
                    ticket.theme.selected === 'LIGHT' ? 'text-white' : '',
                  ]"
                >
                  ${{ ticket.discount_price }}
                </div>
              </div>
              <div
                class="flex items-center rounded-[48px] px-[18px] py-[13px] lg:px-[26px] lg:py-[19px]"
                :class="[
                  ticket.theme.selected === 'LIGHT'
                    ? 'bg-white text-appText'
                    : 'bg-appText text-white',
                ]"
              >
                <span
                  class="text-sm leading-none tracking-[-0.41px] font-medium mr-2 lg:text-lg lg:leading-none"
                >
                  Buy now
                </span>
                <ArrowIcon class="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]" />
              </div>
            </div>
          </div>
          <BCMSImage
            :media="ticket.background"
            :options="{
              sizes: {
                exec: [
                  {
                    width: 660,
                    height: 250,
                  },
                  {
                    width: 1344,
                    height: 448,
                  },
                ],
              },
            }"
            class="absolute top-0 left-0 w-full h-full cover"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TicketsGroup } from '~~/bcms/types';
import { BCMSImage } from '~~/bcms-components';
import ArrowIcon from '@/assets/icons/arrow.svg';

defineProps({
  data: {
    type: Object as PropType<TicketsGroup>,
    required: true,
  },
});
</script>
