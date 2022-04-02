<template>
  <div>
    <v-row justify="center" align="center">
      <gmap-autocomplete
        id="autocomplete"
        class="search_container"
        placeholder="カフェ・コーヒーショップ検索"
        :select-first-on-enter="true"
        @place_changed="setPlace"
        :value="placeName"
        :options="{
          fields: [
            'geometry',
            'place_id',
            'name',
            'formatted_address',
            'photos',
            'opening_hours',
            'types',
          ],
        }"
      />
    </v-row>
    <v-row>
      <GmapMap
        class="gmap-map"
        map-type-id="roadmap"
        :center="centerLocation"
        :zoom="zoom"
        :options="mapOptions"
        ref="mapRef"
        :style="styleMap"
      >
        <GmapMarker
          :position="currentLocation"
          :clickable="false"
          :draggable="false"
          :animation="2"
        />
        <template v-for="m in markers">
          <GmapMarker
            v-if="isIndicate(m)"
            :key="m.place_id"
            :position="m.geometry == null ? null : m.geometry.location"
            :title="m.name"
            :clickable="false"
            :draggable="false"
            :icon="cafeIcon"
            :animation="2"
            @click="setMarker(m)"
          />
        </template>
        <GmapMarker
          :position="selectedLocation"
          :clickable="false"
          :draggable="false"
          :animation="1"
          icon="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        />
      </GmapMap>
    </v-row>
    <BottomSheetComponent
      :disable.sync="bottomSheetDisable"
      :select-place="selectPlace"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@nuxtjs/composition-api";
import SpeechballoonComponent from "@/components/molecules/map/SpeechballoonComponent.vue";
import { Place } from "@/types/input";
import BottomSheetComponent from "@/components/molecules/bottom-sheet/BottomSheetComponent.vue";

export default defineComponent({
  components: {
    SpeechballoonComponent,
    BottomSheetComponent,
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
    const selectedLocation = reactive<{
      lat: number | null;
      lng: number | null;
    }>({
      lat: null,
      lng: null,
    });
    const infoWinOpenDisable = ref<boolean>(false);
    const selectedLocationIndex = ref<number | null>(null);
    const zoom = ref<number>(16);
    const styleMap = reactive<any>({
      width: "100%",
      height: "100%",
    });
    const mapOptions = reactive<any>({
      streetViewControl: false,
      styles: [],
      gestureHandling: "greedy",
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      noSuppress: true,
      clickableIcons: false,
    });
    const markers = reactive<google.maps.places.PlaceResult[]>([]);
    const mapRef = ref<any>(null);

    const placeName = ref<string>("");

    const selectPlace = reactive<Place>({
      placeId: "",
      position: undefined,
      name: "",
      address: "",
      photos: [],
      week: [],
    });
    const bottomSheetDisable = ref<boolean>(false);
    const cafeIcon = reactive<{
      url: string;
      scaledSize: google.maps.Size | null;
      origin: google.maps.Point | null;
      anchor: google.maps.Point | null;
    }>({
      url: "/img/coffee.png", // url
      scaledSize: null,
      origin: null,
      anchor: null,
    });

    onMounted(async () => {
      await getCurrentPosition();
      console.log(1);
      mapRef.value.$mapPromise.then(() => {
        cafeIcon.scaledSize = new google.maps.Size(30, 30);
        cafeIcon.origin = new google.maps.Point(0, 0);
        cafeIcon.anchor = new google.maps.Point(0, 0);
      });
      console.log(2);
    });

    const setPlace = (place: google.maps.places.PlaceResult) => {
      const lat: number | undefined = place.geometry?.location.lat();
      const lng: number | undefined = place.geometry?.location.lng();
      if (!lat || !lng || !place.place_id) {
        alert("ないよ");
        setTimeout(() => {}, 2000);
        return;
      }
      placeName.value = place.name;
      setCenterLocation(lat, lng);
      selectPlace.placeId = place.place_id;
      selectPlace.position = place.geometry?.location;
      selectPlace.name = place.name;
      selectPlace.address =
        place.formatted_address == null ? "" : place.formatted_address;
      const map = place.photos?.map((photo: google.maps.places.PlacePhoto) =>
        photo.getUrl({})
      );
      selectPlace.photos = map == null ? [] : map;
      selectPlace.week = place.opening_hours?.weekday_text ?? [];
      bottomSheetDisable.value = true;

      setSelectedLocation(
        selectPlace.position?.lat() ?? 0,
        selectPlace.position?.lng() ?? 0
      );
    };

    const setMarker = (place: google.maps.places.PlaceResult) => {
      const placeId = place.place_id == null ? "" : place.place_id;
      mapRef.value.$mapPromise.then(() => {
        const map = mapRef.value.$mapObject;
        new google.maps.places.PlacesService(map).getDetails(
          {
            placeId: placeId,
            fields: [
              "geometry",
              "place_id",
              "name",
              "formatted_address",
              "photos",
              "opening_hours",
            ],
          },
          function (
            results: google.maps.places.PlaceResult,
            status: google.maps.places.PlacesServiceStatus
          ) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setPlace(results);
            }
          }
        );
      });
    };

    const success = (position: GeolocationPosition) => {
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

    const error = (error: GeolocationPositionError) => {
      if (error.code === 1) {
        //PERMISSION_DENIED
        alert("位置情報の利用が許可されていません");
        setDefaultLocation();
        return;
      }
      if (error.code === 2) {
        //POSITION_UNAVAILABLE
        alert("現在位置が取得できませんでした");
        setDefaultLocation();
        return;
      }
      if (error.code === 3) {
        //TIMEOUT
        alert("タイムアウトになりました");
        return;
      }
      alert("現在位置が取得できませんでした");
      setDefaultLocation();
      return;
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
        setDefaultLocation();
      }
    };

    const setDefaultLocation = () => {
      // 現在地取得不可の場合は東京駅付近に移動
      currentLocation.lat = 35.6813092;
      currentLocation.lng = 139.7677269;
      centerLocation.lat = 35.6813092;
      centerLocation.lng = 139.7677269;
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
                markers.push(place);
              });
            }
          }.bind(this)
        );
      });
    };

    const isIndicate = (place: google.maps.places.PlaceResult): boolean => {
      if (place.geometry == null) {
        return true;
      }
      const markerLat = place.geometry.location.lat();
      const markerlng = place.geometry.location.lng();

      return (
        markerLat !== selectedLocation.lat || markerlng !== selectedLocation.lng
      );
    };

    const setCenterLocation = (lat: number, lng: number) => {
      centerLocation.lat = lat;
      centerLocation.lng = lng;
    };
    const setSelectedLocation = (lat: number, lng: number) => {
      selectedLocation.lat = lat;
      selectedLocation.lng = lng;
    };

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
      setPlace,
      setMarker,
      isIndicate,
      selectPlace,
      bottomSheetDisable,
      placeName,
      cafeIcon,
    };
  },
});
</script>
 
<style lang="postcss" scoped>
.search_container {
  padding: 3px 10px;
  border-radius: 20px;
  height: 2.3em;
  width: 265px;
  background-color: #fff;
  margin: 3px 0 3px 0;
}
.search_container:focus {
  outline: 3px solid #795548;
}
.gmap-map {
  position: absolute;
}

.gmap-map >>> .gm-style {
  height: 40px;
}
</style>