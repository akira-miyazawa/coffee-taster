<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <GmapMap
          map-type-id="roadmap"
          :center="maplocation"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
          ref="mapRef"
        >
          <GmapMarker
            v-for="m in markers"
            :position="m.position"
            :title="m.title"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            :key="m.id"
          >
          </GmapMarker>
        </GmapMap>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup(props, context) {
    const maplocation = reactive<{ lat: number; lng: number }>({
      lat: 0,
      lng: 0,
    });
    const zoom = ref<number>(17);
    const styleMap = reactive<any>({
      width: "100%",
      height: "400px",
    });
    const mapOptions = reactive<any>({
      streetViewControl: false,
      styles: [],
      gestureHandling: "greedy",
    });
    const markers = reactive<any>([]);
    const mapRef = ref(null) as any;

    onMounted(() => {
      getCurrentPosition();
    });

    const success = (position: any) => {
      maplocation.lat = position.coords.latitude;
      maplocation.lng = position.coords.longitude;
    };
    const error = (error: any) => {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert("位置情報の利用が許可されていません");
          break;
        case 2: //POSITION_UNAVAILABLE
          alert("現在位置が取得できませんでした");
          break;
        case 3: //TIMEOUT
          alert("タイムアウトになりました");
          break;
        default:
          alert("現在位置が取得できませんでした");
          break;
      }
    };
    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        alert(
          "現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。"
        );
        // 現在地取得不可の場合は東京駅付近に移動
        maplocation.lat = 35.6813092;
        maplocation.lng = 139.7677269;
        return;
      }
      navigator.geolocation.getCurrentPosition(success, error);
    };

    return {
      maplocation,
      zoom,
      styleMap,
      mapOptions,
      markers,
      mapRef,
    };
  },
});
</script>