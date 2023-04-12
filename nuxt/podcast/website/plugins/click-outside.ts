import { v4 as uuidv4 } from "uuid";

const handlers: any = {};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    mounted(el, binding) {
      const id = uuidv4();
      el.setAttribute("dir-id", id);

      let latch = false;

      handlers[id] = {
        callback: (event: any) => {
          if (latch) {
            const clickedEl = event.target;
            if (!clickedEl) {
              return;
            }
            if (!el.contains(clickedEl)) {
              binding.value();
            }
          } else {
            latch = true;
          }
        },
      };

      document.addEventListener("click", handlers[id].callback);
    },
    beforeUnmount(el) {
      const id = el.getAttribute("dir-id");
      if (id) {
        document.removeEventListener("click", handlers[id].callback);
        delete handlers[id];
      }
    },
  });
});
