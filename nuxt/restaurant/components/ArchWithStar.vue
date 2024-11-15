<template>
    <div
        class="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none lg:top-[182px]"
    >
        <!-- Small arch -->
        <svg
            width="328"
            height="328"
            viewBox="0 0 328 328"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="lg:hidden"
        >
            <circle
                cx="164"
                cy="164"
                r="163.5"
                stroke="url(#paint0_linear_613_1232)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_613_1232"
                    x1="164"
                    y1="0"
                    x2="164"
                    y2="328"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#C2C0B8" />
                    <stop
                        offset="0.273792"
                        stop-color="#C2C0B8"
                        stop-opacity="0"
                    />
                </linearGradient>
            </defs>
        </svg>
        <!-- Large arch -->
        <svg
            width="1299"
            height="1299"
            viewBox="0 0 1299 1299"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="max-lg:hidden"
        >
            <circle
                cx="649.5"
                cy="649.5"
                r="649"
                stroke="url(#paint0_linear_564_372)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_564_372"
                    x1="649.5"
                    y1="0"
                    x2="649.5"
                    y2="1299"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#C2C0B8" />
                    <stop
                        offset="0.273792"
                        stop-color="#C2C0B8"
                        stop-opacity="0"
                    />
                </linearGradient>
            </defs>
        </svg>
        <SvgoStar
            filled
            :font-controlled="false"
            class="absolute z-10 top-1 right-24 w-4 h-4 lg:w-8 lg:h-8 lg:top-7 lg:right-[400px]"
        />
    </div>
</template>

<script setup lang="ts"></script>
