<template>
  <v-dialog class="dialog" :value="isOpen" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-h6">
        {{ text }}
      </v-card-title>
      <v-spacer></v-spacer>
      <div class="btn-group">
        <TextButtonComponent
          :isText="true"
          :color="execBtnColor"
          :handleClick="exec"
          :btnText="execBtnText"
        />
        <TextButtonComponent
          :isText="true"
          :color="canselBtnColor"
          :handleClick="cancel"
          :btnText="cancelBtnText"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import TextButtonComponent from "@/components/atoms/button/TextButtonComponent.vue";

export default defineComponent({
  components: {
    TextButtonComponent,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    exec: {
      type: Function as (() => Promise<void>) | (() => void),
      required: true,
    },
    execBtnText: {
      type: String,
      required: true,
    },
    execBtnColor: {
      type: String,
      required: true,
    },
    cancel: {
      type: Function as () => void,
      required: true,
    },
    cancelBtnText: {
      type: String,
      required: true,
    },
    canselBtnColor: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="postcss" scoped>
.v-card__title {
  text-align: center;
}
.btn-group {
  text-align: center;
}
</style>