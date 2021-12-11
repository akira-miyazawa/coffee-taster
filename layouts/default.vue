<template>
  <div id="default">
    <v-app>
      <v-app-bar fixed dense app color="brown lighten-3">
        <v-app-bar-title>{{ headerText }}</v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-navigation-drawer
        v-if="$device.isDesktop"
        color="brown"
        app
        touchless
        permanent
      >
        <TabsComponent
          :selectedValue.sync="selectedTab"
          :isFixedTabs="true"
          :isVertical="true"
          color="brown lighten-4"
          :tabValues="leftTabValues"
          :isTabLeft="true"
        />
      </v-navigation-drawer>
      <v-footer v-else fixed padless app>
        <TabsComponent
          :selectedValue.sync="selectedTab"
          :isFixedTabs="true"
          :isVertical="false"
          color="brown lighten-4"
          :height="70"
          :tabValues="underTabValues"
          :isTabLeft="false"
        />
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  reactive,
  useRoute,
  useRouter,
  watch,
} from "@nuxtjs/composition-api";
import TabsComponent, {
  Tabs,
} from "@/components/molecules/tabs/TabsComponent.vue";

type Tab = "index" | "input" | "list" | "account";

export default defineComponent({
  setup(_, context) {
    const router = useRouter();
    const route = useRoute();
    const query = computed(() => route.value.path);
    const headerText = ref<string>();
    const selectedTab = ref<Tab>();
    const underTabValues = reactive<Tabs[]>([
      {
        href: "index",
        clickFunction: () => router.push("/"),
        iconText: "mdi-map-marker",
      },
      {
        href: "input",
        clickFunction: () => router.push("/input"),
        iconText: "mdi-pencil-plus",
      },
      {
        href: "list",
        clickFunction: () => router.push("/list"),
        iconText: "mdi-format-list-bulleted",
      },
      {
        href: "account",
        clickFunction: () => router.push("/account"),
        iconText: "mdi-account",
      },
    ]);
    const leftTabValues = reactive<Tabs[]>([
      {
        href: "index",
        clickFunction: () => router.push("/"),
        iconText: "mdi-map-marker",
        text: "周辺のカフェ",
      },
      {
        href: "input",
        clickFunction: () => router.push("/input"),
        iconText: "mdi-pencil-plus",
        text: "MEMO",
      },
      {
        href: "list",
        clickFunction: () => router.push("/list"),
        iconText: "mdi-format-list-bulleted",
        text: "一覧",
      },
      {
        href: "account",
        clickFunction: () => router.push("/account"),
        iconText: "mdi-account",
        text: "マイページ",
      },
    ]);
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
      underTabValues,
      leftTabValues,
    };
  },
  components: { TabsComponent },
});
</script>

<style>
html,
body,
#__nuxt,
#__layout,
#default {
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
  justify-content: left;
}
.v-tabs {
  text-align: left;
}
</style>
