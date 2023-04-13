<template>
  <BCMSContentManager
    ref="managerDOM"
    :items="item"
    :widget-components="widgetComponents"
    @vnode-mounted="parseInternalLinks"
  />
</template>

<script setup lang="ts">
import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import { PropType } from "vue";
import { BCMSContentManager } from "~~/bcms-components";
import TextWithImage from "~~/components/widgets/TextWithImage.vue";

defineProps({
  item: {
    type: Object as PropType<BCMSPropRichTextDataParsed>,
    required: true,
  },
  widgetComponents: {
    type: Object,
    required: false,
    default: {
      text_with_image: TextWithImage,
    },
  },
});

const managerDOM = ref<any>();

const parseInternalLinks = () => {
  if (managerDOM.value.$el) {
    setTimeout(() => {
      const links = managerDOM.value.$el.querySelectorAll("a");

      links.forEach((link: HTMLAnchorElement) => {
        const href = link.getAttribute("href");

        if (href && href.startsWith("/")) {
          link.target = "_self";
          link.addEventListener("click", (event) => {
            event.preventDefault();

            navigateTo(href);
          });
        }
      });
    }, 0);
  }
};
</script>
