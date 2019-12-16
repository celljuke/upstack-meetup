<template>
  <div class="messages">
    <div class="messages__left">
      <h1>Messages</h1>
      <div class="messages__left__img">
        <messages-icon />
      </div>
    </div>
    <div class="messages__right"></div>
  </div>
</template>

<script>
import MessagesIcon from '@/assets/messages.svg';
export default {
  name: 'Messages',
  components: {
    MessagesIcon
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

    &__user-list {
      margin-top: 30px;

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
