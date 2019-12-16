<template>
  <div class="messages">
    <div class="messages__left">
      <h1>Messages</h1>
      <div class="messages__left__img">
        <messages-icon />
      </div>
      <div class="messages__left__message-list">
        <user-list-item
          v-for="message in messageWithUsers"
          :key="message.id"
          :linkId="message.id"
          :user="message.from"
          @click="goToMessageDetail"
        />
      </div>
    </div>
    <div class="messages__right">
      <router-view />
    </div>
  </div>
</template>

<script>
import MessagesIcon from '@/assets/messages.svg';
import UserListItem from '@/components/UserListItem';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Messages',
  methods: {
    goToMessageDetail(id) {
      this.$router
        .push({
          name: 'messageDetail',
          params: { id, message: this.messageWithUsers.find(m => m.id === id) }
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapState('locations', ['messages', 'users']),
    messageWithUsers() {
      return this.messages.map(message => {
        const from = this.users.find(u => u.uid === message.from_uid);
        return {
          id: message.id,
          body: message.body,
          from
        };
      });
    }
  },
  components: {
    MessagesIcon,
    UserListItem
  }
};
</script>

<style lang="scss" scoped>
.messages {
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

    &__img {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
    }

    &__message-list {
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
