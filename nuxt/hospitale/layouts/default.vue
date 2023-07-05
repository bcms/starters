<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from "@becomes/cms-most/frontend";

BCMSImageConfig.cmsOrigin = "http://localhost:8080";
BCMSImageConfig.publicApiKeyId = "641d60cd2a29ceb11f9ce26c";
BCMSImageConfig.localeImageProcessing = true;
</script>
