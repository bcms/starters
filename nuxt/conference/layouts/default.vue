<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from "@becomes/cms-most/frontend";

BCMSImageConfig.cmsOrigin = "http://localhost:8080";
BCMSImageConfig.publicApiKeyId = "644252f4680cc89b3a427eb7";
BCMSImageConfig.localeImageProcessing = true;
</script>
