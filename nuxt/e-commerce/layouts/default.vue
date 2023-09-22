<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from '@becomes/cms-most/frontend';

BCMSImageConfig.cmsOrigin = 'http://localhost:8080';
BCMSImageConfig.publicApiKeyId = '650c066e93cfd8229365ed18';
BCMSImageConfig.localeImageProcessing = true;
</script>
