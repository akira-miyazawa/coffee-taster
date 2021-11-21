<template>
  <div>
    <LoginPageComponent />
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import LoginPageComponent from "@/components/organisms/login/LoginPageComponent.vue";

export default defineComponent({
  layout: "login",
  components: { LoginPageComponent },
});
</script>