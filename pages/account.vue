<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>{{ userName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-btn v-if="isLoggedIn" @click="logout" x-large color="primary">
      ログアウト
    </v-btn>
    <div v-if="isUnMatchTaste">
      <v-alert border="bottom" color="pink darken-1" dark>
        {{ `コーヒーの${unMatchTaste}に気をつけてください` }}</v-alert
      >
      <RadarChertComponent :coffeeTasteScore="unMatchCoffeeTasteScore" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useStore,
} from "@nuxtjs/composition-api";
import RadarChertComponent from "@/components/chart/RadarChertComponent.vue";
import { getUser } from "@/usecase/UserService";
import { User } from "@/model/User";
import { max } from "@/util/Calc";

type UnMatchTaste = {
  name: string;
  value: number;
};

export default defineComponent({
  components: {
    RadarChertComponent,
  },
  setup(props, context) {
    const store: any = useStore();
    const isUnMatchTaste = ref<Boolean>(true);
    const unMatchTaste = ref<string>();
    const unMatchCoffeeTasteScore = reactive({
      bitterness: 0,
      sourness: 0,
      sweetness: 0,
      richness: 0,
      scent: 0,
    });

    onMounted(async () => {
      const token = store.getters["auth/userToken"];
      const user = await getUser(token);
      convertUnmatchCoffeeTasteScore(user);
      getUnMatchTaste();
    });

    const convertUnmatchCoffeeTasteScore = (user: User) => {
      // nullの場合は非表示
      if (user.unmatchCoffeeTasteScore == null) {
        isUnMatchTaste.value = false;
        return;
      }
      unMatchCoffeeTasteScore.bitterness =
        user.unmatchCoffeeTasteScore.bitterness;
      unMatchCoffeeTasteScore.sourness = user.unmatchCoffeeTasteScore.sourness;
      unMatchCoffeeTasteScore.sweetness =
        user.unmatchCoffeeTasteScore.sweetness;
      unMatchCoffeeTasteScore.richness = user.unmatchCoffeeTasteScore.richness;
      unMatchCoffeeTasteScore.scent = user.unmatchCoffeeTasteScore.scent;
    };

    /**
     * 苦手なテイストを取得する
     */
    const getUnMatchTaste = (): void => {
      const tastes: UnMatchTaste[] = [
        {
          name: "苦味",
          value: unMatchCoffeeTasteScore.bitterness,
        },
        {
          name: "酸味",
          value: unMatchCoffeeTasteScore.sourness,
        },
        {
          name: "甘み",
          value: unMatchCoffeeTasteScore.sweetness,
        },
        {
          name: "コク",
          value: unMatchCoffeeTasteScore.richness,
        },
        {
          name: "香り",
          value: unMatchCoffeeTasteScore.scent,
        },
      ];
      const maxValue = max(tastes.map((taste) => taste.value));
      unMatchTaste.value = tastes
        .filter((taste) => taste.value === maxValue)
        .map((tastes) => tastes.name)
        .join(", ");
    };

    return {
      userName: computed(() => store.getters["auth/userName"]),
      isLoggedIn: computed(() => store.getters["auth/isLoggedIn"]),
      logout: async () => await store.dispatch("auth/logout"),
      isUnMatchTaste,
      unMatchTaste,
      unMatchCoffeeTasteScore,
    };
  },
});
</script>