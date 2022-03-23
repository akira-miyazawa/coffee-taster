<template>
  <v-card class="window">
    <v-img
      v-if="photos.length > 0"
      :src="photos[0]"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div class="title">{{ title }}</div>
    <TextButtonComponent
      :isText="true"
      color="brown"
      :handleClick="toInput"
      btnText="記録する"
    />
  </v-card>
</template>

<script lang="ts">
import { PropType, useRouter, useStore } from "@nuxtjs/composition-api";
import { defineComponent } from "@vue/composition-api";
import TextButtonComponent from "@/components/atoms/button/TextButtonComponent.vue";

export default defineComponent({
  components: {
    TextButtonComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    photos: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const toInput = () => {
      store.commit("shop/setShop", props.title);
      router.push("input");
    };
    return { toInput };
  },
});
</script>

<style scoped lang="postcss">
.window {
  max-width: 50vw;
  max-height: 30vh;
  text-align: center;
}
</style>
