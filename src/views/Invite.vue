<template>
  <div class="invitations">
    <div class="invitations__left">
      <h1>Invitations</h1>
      <div class="invitations__left__img"></div>
    </div>
    <div class="invitations__right"></div>
  </div>
</template>

<script>
export default {
  name: 'Invite'
};
</script>

<style lang="scss" scoped>
.invitations {
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
