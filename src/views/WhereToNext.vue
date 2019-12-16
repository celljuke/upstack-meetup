<template>
  <div class="where-to-next">
    <div class="where-to-next__left">
      <h1>Where to next?</h1>
      <div class="where-to-next__left__img"></div>
    </div>
    <div class="where-to-next__right"></div>
  </div>
</template>

<script>
export default {
  name: 'WhereToNext'
};
</script>

<style lang="scss" scoped>
.where-to-next {
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
