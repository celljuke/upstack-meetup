<template>
  <div class="user-list-item" @click="goToDetail">
    <up-avatar
      :avatar-image="userInfo.avatar"
      :size="50"
      line-color="#008EF4"
    />
    <div class="user-list-item__user-info">
      <div class="user-list-item__user-info__user-name">
        <span class="user-list-item__user-info__user-name__name">
          {{ userInfo.name }}
        </span>
        <span class="user-list-item__user-info__user-name__location">
          {{ userInfo.location }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UpAvatar from '@/components/UpAvatar.vue';
import { mapState, mapActions } from 'vuex';
import AvatarImage from '@/assets/empty-profile.jpg';
export default {
  name: 'UserListItem',
  props: {
    src: String,
    name: String,
    location: String,
    linkId: [String, Number],
    user: Object
  },
  components: {
    UpAvatar
  },
  computed: {
    ...mapState('locations', ['allLocations', 'messages']),
    userInfo() {
      const userLocation = this.allLocations.find(
        l => l.user_uid === this.user.uid
      );

      return {
        name: `${this.user.first_name} ${this.user.last_name}`,
        avatar: this.user.avatar || AvatarImage,
        location: `${userLocation.city}, ${userLocation.country}`
      };
    }
  },
  methods: {
    goToDetail() {
      this.$emit('click', this.linkId);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list-item {
  width: 100%;
  display: flex;
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e9f4fd;
  }

  &__user-info {
    flex: 1;
    display: flex;
    margin-left: 10px;
    align-items: center;

    &__user-name {
      display: flex;
      flex-direction: column;

      &__name {
        display: block;
        font-size: 14px;
      }

      &__location {
        display: block;
        font-size: 10px;
        color: #979797;
      }
    }
  }
}
</style>
