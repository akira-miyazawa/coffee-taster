<template>
  <v-dialog class="dialog" :value="isOpen" max-width="600px" persistent>
    <v-card>
      <v-card-title class="text-h6">
        {{ text }}
      </v-card-title>
      <v-spacer></v-spacer>
      <div class="btn-group">
        <v-btn :color="handleBtnColor" text @click="handle">
          {{ handleBtnText }}
        </v-btn>
        <v-btn :color="canselBtnColor" text @click="cancel">
          {{ cancelBtnText }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    handle: {
      type: Function,
      require: true,
    },
    handleBtnText: {
      type: String,
      require: true,
    },
    handleBtnColor: {
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
  setup() {},
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