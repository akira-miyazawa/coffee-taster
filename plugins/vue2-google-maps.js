import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBpsJDdLtpXQbJ3AEhhdbAd_GUnW-A1Enw',
    libraries: 'places', 
  },
})