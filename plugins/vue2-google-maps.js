import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { googleMapConfig } from './config';

Vue.use(VueGoogleMaps, {
  load: googleMapConfig
})