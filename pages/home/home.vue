<template>
  <div>
    <v-text-field v-model="data" :counter="10" label="Name"></v-text-field>
    {{ data }}
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const data = ref<string>("");
    return {
      data,
    };
  },
});
</script>