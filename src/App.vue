<template>
  <div id="app">
    <router-view v-if="!appLoading" />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('locations');
export default {
  name: 'App',
  data() {
    return {
      appLoading: true
    };
  },
  async created() {
    if (localStorage.getItem('token')) {
      await this.getAllUsers();
      await this.getAllMessages();
      await this.getAllLocations();
      this.appLoading = false;
    } else {
      this.appLoading = false;
    }
  },
  methods: {
    ...mapActions(['getAllUsers', 'getAllMessages', 'getAllLocations'])
  }
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lobster|Open+Sans:400,600&display=swap');

html,
body {
  height: 100%;
  width: 100%;
}
* {
  box-sizing: border-box;
}
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  #app {
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Open Sans', sans-serif;
  }
}
</style>
