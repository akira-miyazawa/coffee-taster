<template>
  <div>
    <InputPageComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import InputPageComponent from "@/components/organisms/input/InputPageComponent.vue";

export default defineComponent({
  components: {
    InputPageComponent,
  },
});
</script>