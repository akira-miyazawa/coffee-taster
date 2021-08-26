<template>
  <v-layout>
    <v-flex align-self-center text-center>
      {{ itemName }}
    </v-flex>
    <v-flex align-self-center text-center>
      <v-rating
        background-color="cyan lighten-2"
        color="blue"
        length="5"
        :value="1"
      />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    itemName: {
      type: String,
      require: true,
    },
  },
});
</script>