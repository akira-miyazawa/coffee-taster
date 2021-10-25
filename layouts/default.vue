<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed>
      <v-tabs v-model="selectedTab" fixed-tabs>
        <v-tab href="index" @click.prevent="homeRoute()">
          <v-icon>mdi-map-outline</v-icon>
        </v-tab>
        <v-tab href="input" @click.prevent="inputRoute()">
          <v-icon>mdi-pencil-plus</v-icon>
        </v-tab>
        <v-tab href="list" @click.prevent="listRoute()">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-tab>
        <v-tab href="account" @click.prevent="accountRoute()">
          <v-icon>mdi-account</v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRoute,
  useRouter,
  watch,
} from "@nuxtjs/composition-api";

type Tab = "index" | "input" | "list" | "account";

export default defineComponent({
  setup(_, context) {
    const router = useRouter();
    const route = useRoute();
    const query = computed(() => route.value.path);
    const selectedTab = ref<Tab>();

    onMounted(() => {
      if (query.value === "/") {
        selectedTab.value = "index";
        return;
      }
      if (query.value === "/input") {
        selectedTab.value = "input";
        return;
      }
      if (query.value === "/list") {
        selectedTab.value = "list";
        return;
      }
      if (query.value === "/account") {
        selectedTab.value = "account";
        return;
      }
    });

    watch(query, (newVal) => {
      if (newVal === "/") {
        selectedTab.value = "index";
        return;
      }
      if (newVal === "/input") {
        selectedTab.value = "input";
        return;
      }
      if (newVal === "/list") {
        selectedTab.value = "list";
        return;
      }
      if (newVal === "/account") {
        selectedTab.value = "account";
        return;
      }
    });

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
      selectedTab,
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
