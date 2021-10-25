<template>
  <div>
    <div class="window">
      <div class="title">{{ title }}</div>
      <v-btn tile color="primary" @click="handleClick">
        <v-icon left> mdi-pencil </v-icon>
        記録する
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useStore } from "@nuxtjs/composition-api";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const handleClick = () => {
      store.commit("shop/setShop", props.title);
      router.push("input");
    };
    return { handleClick };
  },
});
</script>

<style scoped>
.window {
  text-align: center;
}
.btn {
  text-align: center;
}
</style>
