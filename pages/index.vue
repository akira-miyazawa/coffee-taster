<template>
  <map-component />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import MapComponent from "@/components/map/MapComponent.vue";

export default defineComponent({
  components: {
    MapComponent,
  },
  setup(props, context) {},
});
</script>