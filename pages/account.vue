<template>
  <div>
    <DesktopAccountPageComponent v-if="$device.isDesktop" />
    <MoblieAccountPageComponent v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import DesktopAccountPageComponent from "@/components/organisms/account/DesktopAccountPageComponent.vue";
import MoblieAccountPageComponent from "@/components/organisms/account/MoblieAccountPageComponent.vue";

export default defineComponent({
  components: {
    DesktopAccountPageComponent,
    MoblieAccountPageComponent,
  },
});
</script>