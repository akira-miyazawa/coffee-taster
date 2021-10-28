<template>
  <div id="firebase-ui">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import { defineComponent, onMounted } from "@nuxtjs/composition-api";

export default defineComponent({
  layout: "login",
  setup() {
    const useFirebaseUi = () => {
      const firebaseui = require("firebaseui-ja");
      require("firebaseui-ja/dist/firebaseui.css");
      //firebaseuiの設定
      const uiConfig = {
        //signin成功後に遷移先
        signInSuccessUrl: "/",
        //signin方法
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };
      //再度アクセスした時に、もう一度 new するとerrorが出るため分岐
      if (firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance();
        ui.start("#firebaseui-auth-container", uiConfig);
      } else {
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", uiConfig);
      }
    };

    onMounted(useFirebaseUi);
  },
});
</script>

<style lang="postcss" scoped>
#firebaseui-auth-container >>> .firebaseui-container.mdl-card {
  background-color: #efebe9;
}
</style>