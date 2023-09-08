<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

BCMSImageConfig.cmsOrigin = 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId = '6423fe69c4d0f7aa085d5e86';
BCMSImageConfig.localeImageProcessing = true;
</script>
