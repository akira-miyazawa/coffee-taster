<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
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
            :position="maplocation"
            :clickable="true"
            :draggable="false"
          >
          </GmapMarker>
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
      {{ maplocation }}
    </v-col>
  </v-row>
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
    const mapRef = ref<any>(null);

    onMounted(() => {
      getCurrentPosition();
    });

    const success = (position: any) => {
      maplocation.lat = position.coords.latitude;
      maplocation.lng = position.coords.longitude;
      mapRef.value.$gmapApiPromiseLazy().then(() => {
        google.maps.event.addListenerOnce(
          mapRef.value.$mapObject,
          "idle",
          function () {
            setPlaceMarker();
          }
        );
      });
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
      if (navigator.geolocation) {
        return new Promise(() =>
          navigator.geolocation.getCurrentPosition(success, error)
        );
      } else {
        alert(
          "現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。"
        );
        // 現在地取得不可の場合は東京駅付近に移動
        maplocation.lat = 35.6813092;
        maplocation.lng = 139.7677269;
      }
    };

    const setPlaceMarker = () => {
      mapRef.value.$mapPromise.then(() => {
        const map = mapRef.value.$mapObject;
        const placeService = new google.maps.places.PlacesService(map);
        placeService.nearbySearch(
          {
            location: new google.maps.LatLng(maplocation.lat, maplocation.lng),
            radius: 500,
            type: "cafe",
          },
          function (
            results: google.maps.places.PlaceResult[],
            status: google.maps.places.PlacesServiceStatus
          ) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach((place: any) => {
                // デフォルトのアイコンが大きめなので縮小
                const icon = {
                  url: "/img/coffee.png", // url
                  scaledSize: new google.maps.Size(30, 30), // scaled size
                  origin: new google.maps.Point(0, 0), // origin
                  anchor: new google.maps.Point(0, 0), // anchor
                };
                const marker = {
                  position: place.geometry.location,
                  icon: icon,
                  title: place.name,
                  id: place.place_id,
                };
                markers.push(marker);
              });
            }
          }.bind(this)
        );
      });
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