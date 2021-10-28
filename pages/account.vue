<template>
  <div>
    <v-row class="user-info">
      <v-icon class="user-icon" absolute left>mdi-account-circle</v-icon>
      <v-col>{{ userName }} さん</v-col>
      <v-icon
        class="logout-icon"
        style="font-size: 36px"
        absolute
        right
        @click="indicateConfirmLogout"
        >mdi-logout</v-icon
      >
    </v-row>
    <v-divider></v-divider>
    <div v-if="isUnMatchTaste">
      <div>あなたの苦手な傾向</div>
      <v-chip
        v-for="taste in unMatchTastes"
        :key="taste"
        class="ma-2"
        color="red"
        text-color="white"
      >
        {{ taste }}
      </v-chip>
      <RadarChertComponent :coffeeTasteScore="unMatchCoffeeTasteScore" />
    </div>
    <DialogComponent
      :isOpen.sync="isConfirmLogout"
      text="ログアウトします"
      :handle="logout"
      handleBtnText="ログアウト"
      handleBtnColor="error"
      :cancel="cancelLogout"
      cancelBtnText="キャンセル"
      canselBtnColor="primary"
    />
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
import DialogComponent from "@/components/dialog/DialogComponent.vue";
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
    DialogComponent,
  },
  setup(props, context) {
    const store: any = useStore();
    const isUnMatchTaste = ref<Boolean>(false);
    const unMatchTastes = ref<string[]>([]);
    const unMatchCoffeeTasteScore = reactive({
      bitterness: 0,
      sourness: 0,
      sweetness: 0,
      richness: 0,
      scent: 0,
    });
    const isConfirmLogout = ref<boolean>(false);

    onMounted(async () => {
      const token = store.getters["auth/userToken"];
      const user = await getUser(token);
      convertUnmatchCoffeeTasteScore(user);
      getUnMatchTaste();
    });

    const convertUnmatchCoffeeTasteScore = (user: User) => {
      // nullの場合は非表示
      if (user.unmatchCoffeeTasteScore == null) {
        return;
      }
      isUnMatchTaste.value = true;
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
      unMatchTastes.value = tastes
        .filter((taste) => taste.value === maxValue)
        .map((tastes) => tastes.name);
    };

    const indicateConfirmLogout = () => (isConfirmLogout.value = true);
    const cancelLogout = () => (isConfirmLogout.value = false);

    return {
      userName: computed(() => store.getters["auth/userName"]),
      isLoggedIn: computed(() => store.getters["auth/isLoggedIn"]),
      logout: async () => await store.dispatch("auth/logout"),
      isUnMatchTaste,
      unMatchTastes,
      unMatchCoffeeTasteScore,
      isConfirmLogout,
      indicateConfirmLogout,
      cancelLogout,
    };
  },
});
</script>
<style lang="postcss" scoped>
.user-info {
  align-items: center;
}
.v-divider {
  margin: 10px 0 10px 0;
}
.user-icon {
  margin-left: 10px;
  font-size: 36px;
}
.logout-icon {
  margin-right: 10px;
  font-size: 36px;
}
</style>