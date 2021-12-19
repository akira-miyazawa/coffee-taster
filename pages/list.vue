<template>
  <div>
    <DesktopListPageComponent v-if="$device.isDesktop" />
    <MoblieListPageComponent v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import DesktopListPageComponent from "@/components/organisms/list/DesktopListPageComponent.vue";
import MoblieListPageComponent from "@/components/organisms/list/MoblieListPageComponent.vue";

export default defineComponent({
  components: {
    DesktopListPageComponent,
    MoblieListPageComponent,
  },
});
</script>