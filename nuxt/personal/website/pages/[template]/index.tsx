import { NuxtLink } from '#components';

export default defineNuxtComponent({
  setup() {
    const { $bcms } = useNuxtApp();
    const route = useRoute();
    const { data } = useAsyncData(async (ctx) => {
      const result = await $bcms.entry.getAll({
        template: (route.params.template as string) || '',
      });
      return result.map((e) => {
        return {
          title: e.meta.en.title,
          uri: `/${route.params.template}/${e.meta.en.slug}`,
        };
      });
    });

    return () => (
      <div>
        <NuxtLink href="/">Home</NuxtLink>
        <ul>
          {data.value?.map((item) => {
            return (
              <li>
                <NuxtLink href={item.uri}>{item.title}</NuxtLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
