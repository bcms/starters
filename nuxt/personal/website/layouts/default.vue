<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BCMSImageConfig } from "@becomes/cms-most/frontend";

BCMSImageConfig.cmsOrigin = "http://localhost:8080";
BCMSImageConfig.publicApiKeyId = "6426db7f153ad5151b28771c";
</script>
