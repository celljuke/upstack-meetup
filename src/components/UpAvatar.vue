<template>
  <div class="up-avatar" :style="upAvatarStyle">
    <div class="up-avatar-image" :style="upAvatarImageStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'UpAvatar',
  props: {
    size: {
      type: Number,
      default: 120
    },
    lineColor: {
      type: String,
      default: '#E63362'
    },
    avatarImage: {
      type: String
    }
  },
  computed: {
    upAvatarStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        background: 'transparent',
        border: `2px solid ${this.lineColor}`,
        borderRadius: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };
    },
    upAvatarImageStyle() {
      return {
        width: `${this.size - this.size / 6}px`,
        height: `${this.size - this.size / 6}px`,
        borderRadius: '100%',
        backgroundImage: `url(${this.avatarImage})`,
        backgroundSize: 'cover'
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
