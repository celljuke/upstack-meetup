<template>
  <div class="dashboard" v-if="!appLoading">
    <div class="dashboard__left">
      <meetup-logo />
      <span class="dashboard__left__logo-label">meetup</span>
      <div class="dashboard__left__avatar">
        <up-avatar :avatar-image="userInfo.avatar" :size="100" />
        <span class="dashboard__left__avatar__name">{{ userInfo.name }}</span>
        <span class="dashboard__left__avatar__location">
          {{
          userInfo.location
          }}
        </span>
      </div>
      <div class="dashboard__left__statistics">
        <div class="dashboard__left__statistics__statistic">
          <span class="dashboard__left__statistics__statistic__label">Places</span>
          <span class="dashboard__left__statistics__statistic__value">29</span>
        </div>
        <div class="dashboard__left__statistics__statistic">
          <span class="dashboard__left__statistics__statistic__label">Friends</span>
          <span class="dashboard__left__statistics__statistic__value">56</span>
        </div>
      </div>
      <div class="dashboard__left__divider"></div>
      <div class="dashboard__left__menu">
        <div class="dashboard__left__menu__item">
          <router-link to="/find-your-friends" class="dashboard__left__menu__item__link">
            <span class="dashboard__left__menu__item__link__label">Find your friends</span>
          </router-link>
        </div>
        <div class="dashboard__left__menu__item">
          <router-link to="/messages" class="dashboard__left__menu__item__link">
            <span class="dashboard__left__menu__item__link__label">Messages</span>
            <span
              class="dashboard__left__menu__item__link__count"
              v-if="messagesCount"
            >{{ messagesCount }}</span>
          </router-link>
        </div>
        <div class="dashboard__left__menu__item">
          <router-link to="/invite" class="dashboard__left__menu__item__link">
            <span class="dashboard__left__menu__item__link__label">Invite</span>
          </router-link>
        </div>
        <div class="dashboard__left__menu__item">
          <router-link to="/where-to-next" class="dashboard__left__menu__item__link">
            <span class="dashboard__left__menu__item__link__label">Where to next?</span>
          </router-link>
        </div>
      </div>
      <div class="dashboard__left__logout" @click="logout">
        <logout />
        <span class="dashboard__left__logout__label">Logout</span>
      </div>
    </div>
    <div class="dashboard__right">
      <router-view />
    </div>
  </div>
  <div class="page-loader" v-else>
    <up-loader />
  </div>
</template>

<script>
import MeetupLogo from '@/assets/meetup-logo.svg';
import Logout from '@/assets/images/icons/logout.svg';
import UpAvatar from '@/components/UpAvatar.vue';
import AvatarImage from '@/assets/sk.jpeg';
import { mapState, mapActions } from 'vuex';
import UpLoader from '@/components/UpLoader';
export default {
  name: 'Dashboard',
  data() {
    return {
      appLoading: true
    };
  },
  components: {
    MeetupLogo,
    UpAvatar,
    Logout,
    UpLoader
  },
  async created() {
    const currentUser = JSON.parse(localStorage.getItem('activeUser'));
    await this.getAllUsers();
    await this.getAllLocations();
    await this.getMyMessages(currentUser.uid);
    this.appLoading = false;
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('locations', ['allLocations', 'messages']),
    userInfo() {
      const currentUser = JSON.parse(localStorage.getItem('activeUser'));

      const userLocation = this.allLocations.find(
        l => l.user_uid === currentUser.uid
      );

      return {
        name: `${currentUser.first_name} ${currentUser.last_name}`,
        avatar: currentUser.avatar,
        location: `${userLocation && userLocation.city}, ${userLocation &&
          userLocation.country}`
      };
    },
    messagesCount() {
      return this.messages && this.messages.length;
    },
    avatarImage() {
      return AvatarImage;
    }
  },
  methods: {
    ...mapActions('authentication', ['logout']),
    ...mapActions('locations', [
      'getAllUsers',
      'getMyMessages',
      'getAllLocations'
    ])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;

  &__left {
    width: 250px;
    height: 100%;
    padding: 35px 15px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #3f3f3f;

    &__logo-label {
      font-size: 24px;
      color: #e63362;
      font-family: 'Lobster', cursive;
    }

    &__avatar {
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__name {
        display: block;
        margin-top: 10px;
        text-align: center;
        font-size: 18px;
      }

      &__location {
        display: block;
        text-align: center;
        font-size: 12px;
        color: #979797;
      }
    }

    &__statistics {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;

      &__statistic {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__label {
          font-size: 16px;
        }

        &__value {
          font-size: 12px;
          color: #979797;
        }
      }
    }

    &__divider {
      height: 1px;
      width: 100%;
      background-color: #d8d8d8;
      margin: 30px 0 10px;
    }

    &__menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      padding-left: 29px;
      flex: 1;

      &__item {
        &__link {
          text-decoration: none;
          color: #3f3f3f;
          font-weight: 600;
          transition: color 0.3s ease-in-out;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &__count {
            width: auto;
            min-width: 18px;
            height: 18px;
            flex: 0 0 auto;
            padding: 3px;
            font-size: 12px;
            background-color: #e63362;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          }

          &:hover {
            color: #e63362;
          }

          &.router-link-active {
            color: #e63362;
          }
        }
      }
    }

    &__logout {
      width: 100%;
      padding-left: 29px;
      display: flex;
      cursor: pointer;

      &__label {
        margin-left: 8px;
      }
    }
  }

  &__right {
    flex: 1;
    box-shadow: -9px 0px 10px -8px rgba(0, 0, 0, 0.08);
  }
}

.page-loader {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
