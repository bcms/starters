<template>
    <section class="mt-6 mb-8 md:mt-10 md:mb-12 lg:mt-[76px] lg:mb-16">
        <div class="container">
            <div class="flex flex-col items-center">
                <h1
                    class="font-bold leading-none tracking-[-0.32px] mb-4 md:text-3xl md:leading-none lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.96px] lg:mb-5"
                >
                    Contact
                </h1>
                <div class="flex items-center justify-center gap-3 lg:gap-4">
                    <a
                        :href="`mailto:lorem@mail.com`"
                        class="flex items-center gap-2 px-4 py-2.5 bg-appText rounded-[7px] text-appText-light transition-colors duration-300 hover:bg-appText/80 lg:py-3"
                        :style="{
                            boxShadow:
                                '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                        }"
                    >
                        <SvgoEmail
                            filled
                            :font-controlled="false"
                            class="w-3 h-3 lg:w-4 lg:h-4"
                        />
                        <span
                            class="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-sm lg:leading-none lg:tracking-[-0.28px]"
                        >
                            lorem@mail.com
                        </span>
                    </a>
                    <a
                        :href="`tel:(+1) 877 881 8283`"
                        class="flex items-center gap-2 px-4 py-2.5 bg-appText rounded-[7px] text-appText-light transition-colors duration-300 hover:bg-appText/80 lg:py-3"
                        :style="{
                            boxShadow:
                                '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                        }"
                    >
                        <SvgoTel
                            filled
                            :font-controlled="false"
                            class="w-3 h-3 lg:w-4 lg:h-4"
                        />
                        <span
                            class="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-sm lg:leading-none lg:tracking-[-0.28px]"
                        >
                            (+1) 877 881 8283
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>
