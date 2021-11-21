<template>
  <div>
    <ListPageComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import ListPageComponent from "@/components/organisms/list/ListPageComponent.vue";

export default defineComponent({
  components: {
    ListPageComponent,
  },
});
</script>