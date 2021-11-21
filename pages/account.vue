<template>
  <div>
    <AccountPageComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import AccountPageComponent from "@/components/organisms/account/AccountPageComponent.vue";

export default defineComponent({
  components: {
    AccountPageComponent,
  },
});
</script>