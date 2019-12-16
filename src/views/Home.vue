<template>
  <div class="home">
    <div class="home__logo">
      <upstack-logo />
      <span class="home__logo__label">meetup</span>
    </div>
    <div class="home__background">
      <div class="home__background__img">
        <home-illustration />
      </div>
    </div>
    <div class="home__buttons">
      <up-button
        label="Login"
        button-type="primary"
        width="280px"
        height="50px"
        font-size="18px"
        @click="goToRoute('login')"
      />
      <up-button
        label="Create Account"
        button-type="line"
        width="280px"
        height="50px"
        font-size="18px"
        @click="goToRoute('register')"
      />
    </div>
  </div>
</template>

<script>
import HomeIllustration from '@/assets/onboarding-img.svg';
import UpstackLogo from '@/assets/upstack-logo.svg';
import UpButton from '@/components/UpButton';
export default {
  name: 'home',
  components: {
    HomeIllustration,
    UpstackLogo,
    UpButton
  },
  methods: {
    goToRoute(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__background {
    position: relative;
    height: 50%;
    width: 100%;
    background-image: linear-gradient(180deg, #008ff4 0%, #00c2fa 100%);

    &__img {
      position: absolute;
      left: calc(50% - 300px);
      bottom: -86px;
    }
  }

  &__logo {
    position: absolute;
    width: 100%;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;

    &__label {
      font-size: 22px;
      color: #fff;
      font-family: 'Lobster', cursive;
    }
  }

  &__buttons {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;

    div.up-button + div {
      margin-top: 20px;
    }
  }
}
</style>
