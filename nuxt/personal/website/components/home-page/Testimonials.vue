<template>
  <section class="pb-10 lg:pb-14">
    <div class="container">
      <div
        class="mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10"
      >
        <div class="flex items-center mb-[14px] md:mt-4">
          <div
            class="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1"
          />
          <h2
            class="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none"
          >
            {{ data.title }}
          </h2>
        </div>
        <div class="md:max-w-[761px]">
          <ContentManager
            :item="data.description"
            class="homeTestimonials--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 pb-6 border-b border-appGray-100 mb-6 lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8"
          />
          <div class="grid grid-cols-1 gap-6 lg:gap-8">
            <div
              v-for="(item, index) in data.items"
              :key="index"
              class="pb-6 border-b border-appGray-100 lg:pb-8"
            >
              <div class="flex items-center mb-[14px] lg:mb-6">
                <BCMSImage
                  :media="item.author.avatar"
                  :options="{
                    sizes: {
                      exec: [
                        {
                          width: 100,
                          height: 100,
                        },
                      ],
                    },
                  }"
                  class="w-8 h-8 rounded-full overflow-hidden cover mr-2.5 lg:w-12 lg:h-12 lg:mr-4"
                />
                <div
                  class="text-sm leading-none tracking-[-0.41px] font-Helvetica lg:text-lg lg:leading-none"
                >
                  {{ item.author.name }}
                </div>
              </div>
              <ContentManager
                :item="item.content"
                class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:leading-[1.4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HomeTestimonials } from "~~/types";
import { BCMSImage } from "~~/bcms-components";

defineProps({
  data: {
    type: Object as PropType<HomeTestimonials>,
    required: true,
  },
});
</script>

<style lang="scss">
.homeTestimonials {
  &--description {
    strong {
      @apply font-medium text-appGray-600;
    }
  }
}
</style>
