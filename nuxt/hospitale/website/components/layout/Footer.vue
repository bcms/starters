<template>
  <footer class="bg-black text-white py-8 lg:py-14">
    <div class="container">
      <div
        class="flex items-center justify-center gap-6 pb-5 border-b border-[#302E45] mb-5 lg:gap-8 lg:mb-6"
      >
        <ContentManager
          v-for="(link, index) in data.social"
          :key="index"
          :item="link"
          class="text-sm leading-none font-PlayfairDisplay font-medium tracking-[-0.41px] text-appGray-200 transition-colors duration-300 hover:text-white lg:text-base lg:leading-none"
        />
      </div>
      <div class="lg:flex lg:items-center lg:justify-between">
        <nav
          class="flex items-center justify-center gap-2 max-lg:mb-8 lg:order-2 lg:gap-4"
        >
          <template v-for="(link, index) in data.nav" :key="index">
            <ContentManager
              :item="link"
              class="text-xs leading-none font-medium tracking-[-0.41px] text-white hover:underline lg:text-sm lg:leading-none"
            />
            <div
              v-if="index !== data.nav.length - 1"
              class="w-1 h-1 rounded-full bg-appGray-100"
            />
          </template>
        </nav>
        <div class="flex items-center justify-center max-lg:mb-3 lg:order-1">
          <div
            class="text-sm leading-none font-medium tracking-[-0.41px] text-[#B2AFCC] mr-2 lg:text-base lg:leading-none lg:mr-3"
          >
            Powered by
          </div>
          <svg
            viewBox="0 0 83 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-[55px] lg:w-[83px]"
          >
            <g clip-path="url(#clip0_454_1512)">
              <path
                d="M0.0738602 21.4282H10.0481C14.8303 21.4282 17.2897 18.9515 17.2897 15.7869C17.2897 13.8056 16.3879 12.6223 15.4315 11.9618C14.8849 11.5766 14.2837 11.3014 13.6005 11.1088V10.9712C14.1471 10.8061 14.639 10.5584 15.1035 10.2282C15.8413 9.6503 16.6065 8.63212 16.6065 6.981C16.6065 4.36676 14.393 2.16528 10.3214 2.16528H0.0738602V21.4282ZM5.12929 9.59525V6.29305H9.2283C10.622 6.29305 11.2778 6.981 11.2778 7.94414C11.2778 8.9073 10.622 9.59525 9.2283 9.59525H5.12929ZM5.12929 17.3004V13.4479H9.50157C11.2778 13.4479 12.0976 14.2734 12.0976 15.3741C12.0976 16.4749 11.2778 17.3004 9.50157 17.3004H5.12929Z"
                fill="white"
              />
              <path
                d="M18.3949 11.7971C18.3949 17.5759 22.7672 21.9789 29.0523 21.9789C33.206 21.9789 35.7474 19.9976 37.2229 17.9887C38.0975 16.8329 38.7534 15.512 39.1632 13.9985H33.9712C33.7798 14.6314 33.4519 15.1818 33.042 15.6496C32.3042 16.5027 31.1291 17.3007 29.0523 17.3007C25.9097 17.3007 23.7236 15.0993 23.7236 11.7971C23.7236 8.49485 25.9097 6.29337 29.0523 6.29337C30.9105 6.29337 32.0855 7.00885 32.8234 7.75185C33.2606 8.16462 33.5885 8.65997 33.8344 9.1828H39.0267C38.6438 7.77938 38.0156 6.54103 37.1683 5.41278C35.7201 3.54152 33.1786 1.61523 29.0523 1.61523C22.7672 1.61523 18.3949 6.01819 18.3949 11.7971Z"
                fill="white"
              />
              <path
                d="M40.946 21.4282H46.0015V10.4208L45.5916 7.94414H45.865L49.5541 17.0252H55.1558L58.845 7.94414H59.1183L58.7085 10.4208V21.4282H63.7639V2.16528H56.659L52.6965 12.0719H52.0134L48.0509 2.16528H40.946V21.4282Z"
                fill="white"
              />
              <path
                d="M65.3977 15.2368C65.7529 16.5027 66.2996 17.631 67.0647 18.6216C68.3764 20.3002 70.6446 21.9789 74.5521 21.9789C79.9901 21.9789 82.75 18.9519 82.75 15.6496C82.75 11.3017 78.2958 10.2835 75.0165 9.48551C72.9944 9.01769 71.4096 8.49485 71.4096 7.3941C71.4096 6.70614 72.0655 6.01819 74.0054 6.01819C75.3994 6.01819 76.1644 6.43096 76.6016 6.84373C76.8476 7.09139 77.0387 7.36657 77.1482 7.66928H82.3402C82.0941 6.54103 81.6297 5.52285 80.9465 4.64226C79.799 3.12875 77.6946 1.61523 74.0054 1.61523C68.9776 1.61523 66.0809 4.47715 66.0809 7.66928C66.0809 11.1641 68.8954 12.485 71.7649 13.2831C74.6067 14.0261 77.4216 14.4664 77.4216 15.9248C77.4216 16.7779 76.6016 17.5759 74.5521 17.5759C72.9125 17.5759 71.9014 16.998 71.3277 16.4201C70.9998 16.0899 70.7538 15.7047 70.5896 15.2368H65.3977Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_454_1512">
                <rect width="82.9091" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          class="text-xs leading-none font-medium tracking-[-0.41px] text-center text-[#83808C] lg:order-3 lg:text-base lg:leading-none"
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

defineProps({
  data: {
    type: Object as PropType<FooterEntryMeta>,
    required: true,
  },
});
</script>
