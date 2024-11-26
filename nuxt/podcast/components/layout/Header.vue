<template>
  <header class="absolute top-0 left-0 w-full z-50">
    <div class="relative z-10 container">
      <nav class="relative flex items-center justify-between pt-6 lg:pt-8">
        <NuxtLink to="/" class="flex" aria-label="Home page">
          <SvgoLogo filled :font-controlled="false" class="w-[101px] md:w-[135px]" />
        </NuxtLink>
        <ul
          class="flex flex-col gap-4 max-md:absolute max-md:left-0 max-md:-bottom-9 max-md:translate-y-full max-md:w-full md:flex-row lg:gap-8"
          :class="[showMobileMenu ? 'flex flex-col' : 'max-md:hidden']">
          <li v-for="(item, index) in nav" :key="index">
            <NuxtLink :to="item.to"
              class="text-lg leading-none font-semibold tracking-[-0.8px] md:text-xl md:leading-none" :class="[
                $route.path === item.to
                  ? ''
                  : 'md:text-appGray-300',
              ]">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
        <button class="flex md:hidden" aria-label="Toggle mobile menu" @click="showMobileMenu = !showMobileMenu">
          <SvgoX filled :font-controlled="false" v-if="showMobileMenu" class="w-6 h-6" />
          <SvgoMenu filled :font-controlled="false" v-else class="w-6 h-6" />
        </button>
      </nav>
    </div>
    <div v-if="showMobileMenu" class="fixed top-0 left-0 w-screen h-screen bg-appBody md:hidden" />
  </header>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false);

const nav = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Episodes',
    to: '/#episodes'
  },
  {
    label: 'About',
    to: '/about'
  }
]
</script>
