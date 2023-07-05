<template>
  <BCMSContentManager
    ref="managerDOM"
    :items="item"
    :widget-components="widgetComponents"
    @vue:mounted="parseInternalLinks"
  />
</template>

<script setup lang="ts">
import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import { PropType } from "vue";
import { BCMSContentManager } from "~~/bcms-components";

defineProps({
  item: {
    type: Object as PropType<BCMSPropRichTextDataParsed>,
    required: true,
  },
  widgetComponents: {
    type: Object,
    required: false,
    default: {},
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
