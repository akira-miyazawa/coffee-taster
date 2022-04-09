<template>
  <div>
    <DesktopListPageComponent v-if="$device.isDesktop" />
    <MoblieListPageComponent v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import DesktopListPageComponent from "@/components/organisms/pc/list/DesktopListPageComponent.vue";
import MoblieListPageComponent from "@/components/organisms/sp/list/MoblieListPageComponent.vue";

export default defineComponent({
  components: {
    DesktopListPageComponent,
    MoblieListPageComponent,
  },
});
</script>