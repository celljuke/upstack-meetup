<template>
  <div class="search">
    <div class="search__left">
      <h1>Find your friends</h1>
      <div class="search__left__search-wrapper">
        <find-friends />
        <div class="search__left__search-wrapper__input-box">
          <div class="up-input-wrapper">
            <div class="up-input">
              <div class="up-input__input-control">
                <gmap-autocomplete @place_changed="getPlace" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search__left__user-list">
        <user-list-item
          v-for="user in filteredUsers"
          :key="user.id"
          @click="goToUserDetail"
          :linkId="user.uid"
          :user="user"
        />
      </div>
    </div>
    <div class="search__right">
      <up-loader v-if="!mapPos && !isRouteUserDetail" />
      <GmapMap
        v-if="mapPos && !isRouteUserDetail"
        :center="mapPos"
        :zoom="10"
        style="width: 100%; height: 100%"
      ></GmapMap>
      <router-view />
    </div>
  </div>
</template>

<script>
import FindFriends from '@/assets/find-friends.svg';
import UserListItem from '@/components/UserListItem';
import UpLoader from '@/components/UpLoader';

import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'Search',
  components: {
    FindFriends,
    UserListItem,
    UpLoader
  },
  data() {
    return {
      mapPos: null
    };
  },
  created() {
    this.getLocation();
  },
  computed: {
    ...mapState('locations', ['users', 'allLocations']),
    ...mapGetters('locations', ['usersWithLocations']),
    isRouteUserDetail() {
      return this.$route.name === 'userDetail';
    },
    filteredUsers() {
      if (this.mapPos && this.mapPos.name) {
        return this.usersWithLocations.filter(
          u =>
            u.location.city === this.mapPos.name ||
            u.location.country === this.mapPos.name
        );
      }

      return this.usersWithLocations.filter(u => u.id < 20);
    }
  },
  methods: {
    ...mapActions('locations', ['getUsersbyCoord']),
    async getUserAvatar(img) {
      const image = await import(/* webpackPrefetch: true */ `@/assets/${img}`);
      return image.default;
    },
    goToUserDetail(uid) {
      this.$router
        .push({ name: 'userDetail', params: { uid } })
        .catch(() => {});
    },
    async getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          this.mapPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const { data: locationsData } = await this.getUsersbyCoord(
            this.mapPos
          );
        });
      }
    },
    async getPlace(place) {
      this.mapPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.name
      };
      const { data: locationsData } = await this.getUsersbyCoord(this.mapPos);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

  &__left {
    width: 500px;
    padding: 30px;
    display: flex;
    flex-direction: column;

    h1 {
      color: #e63362;
      font-size: 24px;
      margin: 5px 0;
    }

    &__search-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;

      &__input-box {
        margin-top: 30px;
        width: 100%;

        .up-input-wrapper {
          @include xsm {
            width: 100%;
          }

          .up-input {
            height: 50px;
            width: 100%;
            background-color: #f1f1f1;
            display: flex;
            align-items: center;
            border-radius: 6px;
            /*padding: 0 25px 0 0;*/

            @include xsm {
              width: 100% !important;
            }

            &.has-error {
              background-color: #ffd4d4;
              input {
                color: #aa0000;

                &::placeholder {
                  color: #f78181;
                }
              }

              .up-input__icon {
                &.active {
                  color: #aa0000;
                }
                color: #f78181;
              }
            }

            &.icon-right {
              .up-input__input-control {
                margin-left: 20px;
              }
            }

            &__icon {
              width: 50px;
              height: 100%;
              /*padding-left: 7px;*/
              display: flex;
              justify-content: center;
              align-items: center;
              color: $disabledColor;
              cursor: pointer;

              &.active {
                color: $black;
              }

              svg {
                fill: currentColor;
                g {
                  stroke: currentColor;
                }
              }
            }

            &__input-control {
              flex: 1;
              height: 100%;
              margin-left: 10px;

              &.no-icon {
                padding-left: 20px;
                margin-left: 0;
              }
              input {
                background: none;
                border: none;
                width: 100%;
                height: 100%;
                font-size: 14px;
                color: $black;
                outline: none;

                &::placeholder {
                  color: $disabledColor;
                  font-weight: 400;
                  font-family: 'Clarkson', sans-serif;
                  font-size: 13.6px;
                  line-height: 24px;
                }
              }
            }

            &__eye-icon-wrapper {
              cursor: pointer;
              padding-right: 27px;
            }

            &__close-wrapper {
              cursor: pointer;
              padding-right: 27px;
              svg {
                g {
                  stroke: #ccc;
                }
              }
            }
          }

          .up-input-errors {
            font-size: 10px;
            color: #a00;
            text-align: left;
            padding-top: 3px;
            height: 15px;
          }
        }
      }
    }

    &__user-list {
      margin-top: 30px;
      overflow-y: scroll;
      flex: 1;

      .user-list-item + div {
        margin-top: 20px;
      }
    }
  }

  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-left: 1px solid #d8d8d8;
  }
}
</style>
