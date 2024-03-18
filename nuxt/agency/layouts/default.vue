<template>
  <div class="flex flex-col min-h-screen">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

BCMSImageConfig.cmsOrigin = 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId = '65f1725abe4bcfba284afdbe';
BCMSImageConfig.localeImageProcessing = false;
</script>
