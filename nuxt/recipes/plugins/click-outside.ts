import { v4 as uuidv4 } from 'uuid';
import type { DirectiveBinding } from 'vue';

const handlers: Record<string, { callback: (event: MouseEvent) => void }> = {};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el: HTMLElement, binding: DirectiveBinding<() => void>) {
            const id = uuidv4();
            el.setAttribute('dir-id', id);

            let latch = false;

            handlers[id] = {
                callback: (event: MouseEvent) => {
                    if (latch) {
                        const clickedEl = event.target as Node | null;

                        if (!clickedEl) {
                            return;
                        }

                        if (!el.contains(clickedEl) && typeof binding.value === 'function') {
                            binding.value();
                        }
                    } else {
                        latch = true;
                    }
                },
            };

            document.addEventListener('click', handlers[id].callback);
        },
        beforeUnmount(el) {
            const id = el.getAttribute('dir-id');

            if (id && handlers[id]) {
                document.removeEventListener('click', handlers[id].callback);
                delete handlers[id];
            }
        },
    });
});

