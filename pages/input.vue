<template>
  <div>
    <v-autocomplete label="ショップ名" hide-details="auto"> </v-autocomplete>
    <v-text-field label="ドリンク名" hide-details="auto"></v-text-field>
    <RatingComponent itemName="苦味" />
    <RatingComponent itemName="酸味" />
    <RatingComponent itemName="甘み" />
    <RatingComponent itemName="香り" />
    <RatingComponent itemName="コク" />
    <radar-chert-component />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import RatingComponent from "@/components/rating/RatingComponent.vue";
import RadarChertComponent from "~/components/chart/RadarChertComponent.vue";

export default defineComponent({
  components: {
    RatingComponent,
    RadarChertComponent,
  },
  setup(props, context) {},
});
</script>