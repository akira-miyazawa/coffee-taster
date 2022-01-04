<template>
  <v-row class="flex-column">
    <v-col>
      <v-speed-dial
        v-model="fab"
        fab
        fixed
        bottom
        right
        :style="{ bottom: `${bottom}px` }"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="brown" dark fab>
            <v-icon v-if="fab"> mdi-undo </v-icon>
            <v-icon v-else> mdi-format-list-bulleted-square </v-icon>
          </v-btn>
        </template>
        <RoundButtonComponent
          :isFab="true"
          :isDark="true"
          :isSmall="true"
          color="red"
          :handleClick="indicateConfirmDelete"
          icon="mdi-delete"
        />
        <RoundButtonComponent
          :isFab="true"
          :isDark="true"
          :isSmall="true"
          color="green"
          :handleClick="indicateConfirmEdit"
          icon="mdi-pencil"
        />
      </v-speed-dial>
    </v-col>
    <v-col>
      <RoundButtonComponent
        :isFixed="true"
        :isFab="true"
        :isBottom="true"
        :isRight="true"
        :styleObj="{ bottom: `${closeBtnBottom}px` }"
        :handleClick="close"
        icon="mdi-close"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@nuxtjs/composition-api";
import RoundButtonComponent from "@/components/atoms/button/RoundButtonComponent.vue";

export default defineComponent({
  components: { RoundButtonComponent },
  props: {
    indicateConfirmDelete: {
      type: Function as () => void,
      required: true,
    },
    indicateConfirmEdit: {
      type: Function as () => void,
      required: true,
    },
    close: {
      type: Function as (() => void) | (() => Promise<void>),
      required: true,
    },
    bottom: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const fab = ref<boolean>(false);
    const closeBtnBottom = computed(() => {
      if (props.bottom > 80) {
        return props.bottom / 2 + 16;
      }
      return 16;
    });
    return { fab, closeBtnBottom };
  },
});
</script>
