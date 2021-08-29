<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed>
      <v-tabs fixed-tabs dark>
        <v-tab @click="homeRoute()">
          <v-icon>mdi-map-outline</v-icon>
        </v-tab>
        <v-tab @click="inputRoute()">
          <v-icon>mdi-pencil-plus</v-icon>
        </v-tab>
        <v-tab @click="listRoute()">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-tab>
        <v-tab @click="accountRoute()">
          <v-icon>mdi-account</v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useRouter,
} from "@nuxtjs/composition-api";
export default defineComponent({
  setup(_, context) {
    const router = useRouter();

    const homeRoute = () => {
      router.push("/");
    };
    const inputRoute = () => {
      router.push("/input");
    };
    const listRoute = () => {
      router.push("/list");
    };
    const accountRoute = () => {
      router.push("/account");
    };

    return {
      homeRoute,
      inputRoute,
      listRoute,
      accountRoute,
    };
  },
});
</script>

<style scoped>
.v-main {
  overflow-y: scroll;
  margin-bottom: 80px;
}
.v-tab {
  min-width: 40px;
}
</style>
