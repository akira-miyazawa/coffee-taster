<template>
  <div>
    <DesktopInputPageComponent v-if="$device.isDesktop" />
    <MobileInputPageComponent v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import DesktopInputPageComponent from "@/components/organisms/input/DesktopInputPageComponent.vue";
import MobileInputPageComponent from "@/components/organisms/input/MobileInputPageComponent.vue";

export default defineComponent({
  components: {
    DesktopInputPageComponent,
    MobileInputPageComponent,
  },
  setup() {
    return {};
  },
});
</script>