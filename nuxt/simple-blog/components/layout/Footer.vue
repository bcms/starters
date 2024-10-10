<template>
    <footer class="py-8">
        <div class="container">
            <div
                class="text-black leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between"
            >
                <a
                    href="https://thebcms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center text-sm max-md:mb-3 lg:text-base lg:leading-none"
                >
                    Powered by
                    <img
                        src="@/assets/media/logo-dark.png"
                        alt="BCMS Logo"
                        class="w-auto h-5 ml-2 lg:h-6 lg:ml-3"
                    />
                </a>
                <div class="text-xs lg:text-base lg:leading-none">
                    &copy; {{ new Date().getFullYear() }} BCMS. All rights
                    reserved
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>
