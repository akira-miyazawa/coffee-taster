<template>
  <div>
    <div class="window">
      <div class="title">{{ title }}</div>
      <TextButtonComponent
        :isText="true"
        color="brown"
        :handleClick="toInput"
        btnText="記録する"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useStore } from "@nuxtjs/composition-api";
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
  text-align: center;
}
</style>
