<template>
  <footer class="bg-appText py-10 md:py-12">
    <div class="container">
      <div class="grid grid-cols-[auto,1fr]">
        <ContentManager
          :item="data.location"
          class="text-sm leading-[1.3] uppercase tracking-[-0.41px] text-appGray-500 text-center mb-8 md:text-base md:leading-[1.3] md:text-left"
        />
        <nav
          class="grid grid-cols-[repeat(2,auto)] justify-between gap-x-12 gap-y-8 mx-auto mb-10 max-md:max-w-[225px] md:mb-20 lg:grid-cols-[repeat(4,auto)] lg:gap-20 xl:gap-[128px]"
        >
          <ContentManager
            v-for="(col, index) in data.nav"
            :key="index"
            :item="col"
            class="footer--nav-col"
          />
        </nav>
      </div>
      <div
        class="flex flex-col items-center text-center md:flex-row md:justify-between"
      >
        <div class="flex items-center max-md:mb-[14px]">
          <span
            class="text-sm leading-none tracking-[-0.41px] text-appBody mr-2 md:text-base md:leading-none md:mr-3"
          >
            Powered by
          </span>
          <BCMSLogo class="w-[55px] md:w-[83px]" />
        </div>
        <div
          class="text-xs leading-none text-appGray-500 md:text-base md:leading-none md:text-appBody"
        >
          &copy; {{ new Date().getFullYear() }} BCMS. All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { FooterEntryMeta } from "~~/bcms/types";
import BCMSLogo from "@/assets/media/bcms-logo.svg";

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>

<style lang="scss">
.footer--nav-col {
  p {
    @apply text-sm leading-none text-appBody mb-[14px] md:text-lg md:leading-none;
  }
  ul {
    @apply grid grid-cols-1 gap-3;
    p {
      @apply relative text-xs leading-none text-appGray-500 mb-0 max-w-max after:absolute after:top-0 after:-right-0.5 after:translate-x-full after:w-3 after:h-3 md:text-base md:leading-none md:after:w-4 md:after:h-4 md:after:top-0.5;
      &::after {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNSA4LjVMOC41IDMuNSIgc3Ryb2tlPSIjOUM5MDkwIiBzdHJva2Utd2lkdGg9IjAuNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOC41IDhWMy41SDQiIHN0cm9rZT0iIzlDOTA5MCIgc3Ryb2tlLXdpZHRoPSIwLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==);

        @media screen and (min-width: 768px) {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuNjY2NjMgMTEuMzMzTDExLjMzMzMgNC42NjYzNCIgc3Ryb2tlPSIjOUM5MDkwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTExLjMzMzQgMTAuNjY3VjQuNjY2OTlINS4zMzMzNyIgc3Ryb2tlPSIjOUM5MDkwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==);
        }
      }
      a {
        @apply hover:underline focus-visible:underline;
      }
    }
  }
}
</style>
