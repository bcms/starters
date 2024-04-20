<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

BCMSImageConfig.cmsOrigin = 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId = '6436aded346e3258041e3557';
BCMSImageConfig.localeImageProcessing = true;
</script>
