<template>
  <div class="message-detail">
    <div class="message-detail__header">
      <div class="message-detail__header__back" @click="$router.go(-1)">
        <back />
      </div>
      <div class="message-detail__header__avatar">
        <up-avatar
          :avatar-image="messageInfo.avatar"
          :size="100"
          line-color="#fff"
        />
        <span class="message-detail__header__avatar__name">{{
          messageInfo.name
        }}</span>
        <span class="message-detail__header__avatar__location">{{
          messageInfo.location
        }}</span>
      </div>
    </div>
    <div class="message-detail__body">
      <p>{{ messageInfo.body }}</p>
    </div>
  </div>
</template>

<script>
import Back from '@/assets/images/icons/back.svg';
import UpAvatar from '@/components/UpAvatar.vue';
import AvatarImage from '@/assets/robert.jpeg';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'MessageDetail',
  components: {
    Back,
    UpAvatar
  },

  computed: {
    ...mapState('locations', ['allLocations', 'messages', 'users']),
    messageInfo() {
      const messageId = this.$route.params.id;
      const allMessages = this.messages.map(message => {
        const from = this.users.find(u => u.uid === message.from_uid);
        return {
          id: message.id,
          body: message.body,
          from
        };
      });

      const activeMessage = allMessages.find(m => m.id == messageId);

      const user = this.users.find(u => u.uid == activeMessage.from.uid);

      const userLocation = this.allLocations.find(
        l => l.user_uid === activeMessage.from.uid
      );

      return {
        name: `${user.first_name} ${user.last_name}`,
        avatar: user.avatar,
        location: `${userLocation.city}, ${userLocation.country}`,
        body: activeMessage.body,
        createdAt: activeMessage.createdAt
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.message-detail {
  background-color: #fff;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-y: scroll;

  &__header {
    position: relative;
    height: 100px;
    width: 100%;
    background-image: linear-gradient(180deg, #008ff4 0%, #00c2fa 100%);
    padding: 20px 15px;

    &__back {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        path {
          fill: #fff;
        }
      }
    }

    &__avatar {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      bottom: -100px;
      width: 100%;

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
  }

  &__body {
    margin-top: 100px;
    padding: 30px;
  }
}
</style>
