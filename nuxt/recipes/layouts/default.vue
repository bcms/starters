<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from "@becomes/cms-most/frontend";

BCMSImageConfig.cmsOrigin = "http://localhost:8080";
BCMSImageConfig.publicApiKeyId = "641322c4b5a472c14b545975";
BCMSImageConfig.localeImageProcessing = true;
</script>
