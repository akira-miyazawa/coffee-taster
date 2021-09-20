<template>
  <div>
    {{ "account" }}
    {{ userName }}
    {{ isLoggedIn }}
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
      logout: () => store.dispatch("auth/logout"),
    };
  },
});
</script>