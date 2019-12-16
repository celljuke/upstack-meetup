import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';
import locations from './locations';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication: {
      namespaced: true,
      ...authentication
    },
    locations: {
      namespaced: true,
      ...locations
    }
  }
});
