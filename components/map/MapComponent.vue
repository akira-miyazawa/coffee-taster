<template>
  <v-row justify="center" align="center">
    <GmapMap
      class="gmap-map"
      map-type-id="roadmap"
      :center="centerLocation"
      :zoom="zoom"
      :style="styleMap"
      :options="mapOptions"
      ref="mapRef"
    >
      <GmapMarker
        :position="currentLocation"
        :clickable="true"
        :draggable="false"
      />
      <GmapMarker
        v-for="(m, index) in markers"
        :key="`GmapMarker${m.id}`"
        :position="m.position"
        :title="m.title"
        :clickable="true"
        :draggable="true"
        :icon="m.icon"
        @click="handleEvent(m.position, index, markers)"
      />
      <GmapInfoWindow
        v-for="m in markers"
        :key="`${m.id}`"
        :position="m.position"
        :title="m.title"
        :opened="m.disable"
      >
        <SpeechballoonComponent :title="m.title" />
      </GmapInfoWindow>
    </GmapMap>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "@nuxtjs/composition-api";
import SpeechballoonComponent from "@/components/map/SpeechballoonComponent.vue";

export default defineComponent({
  components: {
    SpeechballoonComponent,
  },
  setup(props, context) {
    const currentLocation = reactive<{ lat: number; lng: number }>({
      lat: 0,
      lng: 0,
    });
    const centerLocation = reactive<{ lat: number; lng: number }>({
      lat: 0,
      lng: 0,
    });
    const selectedLocation = reactive<{ lat: number; lng: number }>({
      lat: 0,
      lng: 0,
    });
    const infoWinOpenDisable = ref<boolean>(false);
    const selectedLocationIndex = ref<number | null>(null);
    const zoom = ref<number>(17);
    const styleMap = reactive<any>({
      width: "100%",
      height: "400px",
    });
    const mapOptions = reactive<any>({
      streetViewControl: false,
      styles: [],
      gestureHandling: "greedy",
      mapTypeControl: false,
      fullscreenControl: false,
    });
    const markers = reactive<any>([]);
    const mapRef = ref<any>(null);

    onMounted(async () => {
      await getCurrentPosition();
    });

    const success = (position: any) => {
      currentLocation.lat = position.coords.latitude;
      currentLocation.lng = position.coords.longitude;
      // 初回は現在地が中心点
      centerLocation.lat = currentLocation.lat;
      centerLocation.lng = currentLocation.lng;

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

    /**
     * 現在地を取得
     */
    const getCurrentPosition = async () => {
      if (navigator.geolocation) {
        return new Promise(() =>
          navigator.geolocation.getCurrentPosition(success, error)
        );
      } else {
        alert(
          "現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。"
        );
        // 現在地取得不可の場合は東京駅付近に移動
        currentLocation.lat = 35.6813092;
        currentLocation.lng = 139.7677269;
        centerLocation.lat = 35.6813092;
        centerLocation.lng = 139.7677269;
      }
    };

    /**
     *  カフェの場所にマーカーをセット
     */
    const setPlaceMarker = () => {
      mapRef.value.$mapPromise.then(() => {
        const map = mapRef.value.$mapObject;
        const placeService = new google.maps.places.PlacesService(map);
        placeService.nearbySearch(
          {
            location: new google.maps.LatLng(
              currentLocation.lat,
              currentLocation.lng
            ),
            radius: 500,
            type: "cafe",
          },
          function (
            results: google.maps.places.PlaceResult[],
            status: google.maps.places.PlacesServiceStatus
          ) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach((place: google.maps.places.PlaceResult) => {
                // デフォルトのアイコンが大きめなので縮小
                const icon = {
                  url: "/img/coffee.png", // url
                  scaledSize: new google.maps.Size(30, 30), // scaled size
                  origin: new google.maps.Point(0, 0), // origin
                  anchor: new google.maps.Point(0, 0), // anchor
                };
                const marker = {
                  position: place.geometry?.location,
                  icon: icon,
                  title: place.name,
                  id: place.place_id,
                  animation: google.maps.Animation.DROP,
                  disable: true,
                };
                markers.push(marker);
              });
            }
          }.bind(this)
        );
      });
    };

    /**
     * 場所を選択したときの処理を実行
     * @param position 緯度・経度
     * @param index インデックス
     * @param markers マーカーの情報
     */
    const handleEvent = (
      positon: { lat: number; lng: number },
      index: number,
      markers: any[]
    ) => {
      // setCenterLocation(positon.lat, positon.lng);
      // setSelectedLocation(positon.lat, positon.lng);
      // handleGmapInfoWindow(index);
    };

    // const setCenterLocation = (lat: number, lng: number) => {
    //   centerLocation.lat = lat;
    //   centerLocation.lng = lng;
    // };
    // const setSelectedLocation = (lat: number, lng: number) => {
    //   selectedLocation.lat = lat;
    //   selectedLocation.lng = lng;
    // };
    // const handleGmapInfoWindow = (index: number) => {
    //   // 初回
    //   if (selectedLocationIndex.value == null) {
    //     // 前の選択された場所のindexを更新
    //     selectedLocationIndex.value = index;
    //     // 表示する
    //     markers[index].disable = true;
    //     return;
    //   }
    //   // 前に選択された場所は非表示にする
    //   markers[selectedLocationIndex.value].disable = false;
    //   // 前の選択された場所のindexを更新
    //   selectedLocationIndex.value = index;
    //   // 表示する
    //   markers[index].disable = true;
    // };

    return {
      currentLocation,
      centerLocation,
      selectedLocation,
      infoWinOpenDisable,
      selectedLocationIndex,
      zoom,
      styleMap,
      mapOptions,
      markers,
      mapRef,
      handleEvent,
    };
  },
});
</script>
 
<style scoped>
.gmap-map {
  position: unset;
  width: 100%;
  height: 100%;
}
</style>