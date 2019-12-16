import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { ValidationProvider } from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps';

import axiosInstance from './axios-instance';

Vue.prototype.$http = axiosInstance;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;
}

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC12XQ6mbTTSU3jTsk9TWwb-p8zOIYq77U',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
    region: 'EN',
    language: 'en'
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
});

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
