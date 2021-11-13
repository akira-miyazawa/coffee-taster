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
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    exec: {
      type: Function,
      require: true,
    },
    execBtnText: {
      type: String,
      require: true,
    },
    execBtnColor: {
      type: String,
      require: true,
    },
    cancel: {
      type: Function,
      require: true,
    },
    cancelBtnText: {
      type: String,
      require: true,
    },
    canselBtnColor: {
      type: String,
      require: true,
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