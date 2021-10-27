<template>
  <v-row class="flex-column">
    <v-col>
      <v-speed-dial v-model="fab" fab fixed bottom right style="bottom: 80px">
        <template v-slot:activator>
          <v-btn v-model="fab" color="brown" dark fab>
            <v-icon v-if="fab"> mdi-undo </v-icon>
            <v-icon v-else> mdi-format-list-bulleted-square </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="red" @click="indicateConfirmDelete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn fab dark small color="green" @click="indicateConfirmEdit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-col>
    <v-col>
      <v-btn fixed fab bottom right @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    indicateConfirmDelete: {
      type: Function,
      require: true,
    },
    indicateConfirmEdit: {
      type: Function,
      require: true,
    },
    close: {
      type: Function,
      require: true,
    },
  },
  setup() {
    const fab = ref<boolean>(false);
    return { fab };
  },
});
</script>
