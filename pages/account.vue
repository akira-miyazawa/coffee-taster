<template>
  <div>
    <div class="img">
      <v-layout class="layout">
        <ImgComponent src="/img/logo.png" maxHeight="200" maxWidth="200" />
      </v-layout>
    </div>
    <v-divider></v-divider>
    <v-row class="user-info">
      <IconComponent
        class="user-icon"
        :isLeft="true"
        :size="36"
        iconText="mdi-account-circle"
      />
      <v-col class="name"
        ><span class="user-name">{{ userName }}</span> さん</v-col
      >
      <ClickableIconComponent
        class="logout-icon"
        :isRight="true"
        :size="36"
        iconText="mdi-logout"
        :handleClick="indicateConfirmLogout"
      />
    </v-row>
    <v-divider></v-divider>
    <div v-if="isUnMatchTaste">
      <div class="title">あなたの苦手な傾向</div>
      <div v-for="taste in unMatchTastes" :key="taste">
        <ChipComponent color="red" textColor="white" :chipText="taste" />
      </div>
      <RadarChertComponent :coffeeTasteScore="unMatchCoffeeTasteScore" />
    </div>
    <DialogComponent
      :isOpen.sync="isConfirmLogout"
      text="ログアウトします"
      :exec="logout"
      execBtnText="ログアウト"
      execBtnColor="error"
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
import ImgComponent from "@/components/atoms/img/ImgComponent.vue";
import IconComponent from "@/components/atoms/icon/IconComponent.vue";
import ClickableIconComponent from "@/components/atoms/icon/ClickableIconComponent.vue";
import ChipComponent from "@/components/atoms/chip/ChipComponent.vue";
import RadarChertComponent from "@/components/atoms/chart/RadarChertComponent.vue";
import DialogComponent from "@/components/molecules/dialog/DialogComponent.vue";
import { getUser } from "@/usecase/UserService";
import { User } from "@/model/User";
import { max } from "@/util/Calc";

type UnMatchTaste = {
  name: string;
  value: number;
};

export default defineComponent({
  components: {
    ImgComponent,
    IconComponent,
    ClickableIconComponent,
    ChipComponent,
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
.layout {
  justify-content: center;
}
.user-info {
  align-items: center;
}
.v-divider {
  margin: 20px 0 20px 0;
}
.user-icon {
  margin-left: 10px;
}
.user-name {
  font-weight: 600;
}
.logout-icon {
  margin-right: 10px;
}
.title {
  font-weight: 600;
}
</style>