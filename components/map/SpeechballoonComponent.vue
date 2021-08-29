<template>
  <div>
    <div class="window">{{ title }}</div>
    <v-btn color="primary" fab small @click="handleClick">
      <v-icon>mdi-pencil-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { useRouter } from "@nuxtjs/composition-api";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup() {
    const router = useRouter();
    const handleClick = () => {
      router.push("input");
    };
    return { handleClick };
  },
});
</script>

<style scoped>
.window {
  color: #000;
}
</style>
