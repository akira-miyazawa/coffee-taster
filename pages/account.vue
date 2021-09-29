<template>
  <div>
    {{ "account" }}
    {{ userName }}
    <v-btn v-if="isLoggedIn" @click="logout" x-large color="primary">
      ログアウト
    </v-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from "@nuxtjs/composition-api";

export default defineComponent({
  components: {},
  setup(props, context) {
    const store: any = useStore();

    return {
      userName: computed(() => store.state.auth.user.userName),
      isLoggedIn: computed(() => store.getters["auth/isLoggedIn"]),
      logout: async () => await store.dispatch("auth/logout"),
    };
  },
});
</script>