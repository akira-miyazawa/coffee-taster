<template>
  <v-app>
    <v-app-bar fixed dense app color="brown lighten-3">
      <v-app-bar-title>{{ headerText }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed padless app>
      <v-tabs v-model="selectedTab" fixed-tabs color="brown lighten-4">
        <v-tab href="index" @click.prevent="homeRoute()">
          <v-icon>mdi-map-marker</v-icon>
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
    const headerText = ref<string>();
    const selectedTab = ref<Tab>();

    onMounted(() => {
      if (query.value === "/") {
        selectedTab.value = "index";
        headerText.value = "周辺のカフェ";
        return;
      }
      if (query.value === "/input") {
        selectedTab.value = "input";
        headerText.value = "MEMO";
        return;
      }
      if (query.value === "/list") {
        selectedTab.value = "list";
        headerText.value = "一覧";
        return;
      }
      if (query.value === "/account") {
        selectedTab.value = "account";
        headerText.value = "マイページ";
        return;
      }
    });

    watch(query, (newVal) => {
      if (newVal === "/") {
        selectedTab.value = "index";
        headerText.value = "周辺のカフェ";
        return;
      }
      if (newVal === "/input") {
        selectedTab.value = "input";
        headerText.value = "MEMO";
        return;
      }
      if (newVal === "/list") {
        selectedTab.value = "list";
        headerText.value = "一覧";
        return;
      }
      if (newVal === "/account") {
        selectedTab.value = "account";
        headerText.value = "マイページ";
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
      headerText,
      homeRoute,
      inputRoute,
      listRoute,
      accountRoute,
    };
  },
});
</script>

<style>
html,
body,
#__nuxt,
#__layout {
  height: 100% !important;
  width: 100% !important;
  background-color: #efebe9;
}
</style>

<style lang="postcss" scoped>
.v-app-bar >>> .v-toolbar__content {
  justify-content: center;
}
.v-app-bar-title {
  font-size: 16px;
  color: #3e2723;
}
.v-main {
  overflow-y: scroll;
  background-color: #efebe9;
}
.v-tabs >>> .v-slide-group__content {
  background-color: #795548;
}
.v-tab {
  min-width: 40px;
}
</style>
