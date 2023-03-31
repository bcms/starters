import { NuxtLink } from '#components';
import { BCMSImage } from '~~/bcms-components';
import type { BCMSMediaParsed } from '@becomes/cms-client/types';

export default defineNuxtComponent({
  setup() {
    const { $bcms } = useNuxtApp();
    const route = useRoute();
    const { data } = useAsyncData(async (ctx) => {
      return await $bcms.entry.get({
        template: (route.params.template as string) || '',
        entry: (route.params.slug as string) || '',
      });
    });

    return () => (
      <div>
        <NuxtLink href="/">Home</NuxtLink>
        {data.value && (
          <>
            {data.value.meta.en.cover_image && (
              <BCMSImage media={data.value.meta.en.cover_image as BCMSMediaParsed} />
            )}
            <pre>
              <code>{JSON.stringify(data.value, null, '  ')}</code>
            </pre>
          </>
        )}
      </div>
    );
  },
});
