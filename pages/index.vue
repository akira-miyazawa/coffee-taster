<template>
  <div>
    <!-- <MapComponent /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import MapComponent from "@/components/map/MapComponent.vue";

export default defineComponent({
  components: {
    MapComponent,
  },
  setup(props, context) {},
});
</script>