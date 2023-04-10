<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from "@becomes/cms-most/frontend";

BCMSImageConfig.cmsOrigin = "http://localhost:8080";
BCMSImageConfig.publicApiKeyId = "6433b6994c02e25452a8a947";
</script>
