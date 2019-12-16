<template>
  <div class="up-button">
    <button
      :type="type"
      :style="[buttonStyle]"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component :is="svgIcon" v-if="icon && !isLoading" />
      <span class="up-button__label" v-if="!isLoading">{{ label }}</span>
      <slot v-if="!isLoading"></slot>
      <beat-loader
        :loading="isLoading"
        :color="loadingColor"
        size="8px"
      ></beat-loader>
    </button>
  </div>
</template>

<script>
import BeatLoader from '@/components/UpLoader.vue';
export default {
  name: 'UpButton',
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconAlign: {
      type: String,
      default: 'left'
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '55px'
    },
    labelColor: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BeatLoader
  },
  computed: {
    buttonStyle() {
      const buttonStyles = {
        primary: {
          width: this.width,
          height: this.height,
          fontSize: this.fontSize || '14px'
        },
        small: {
          width: '100px',
          height: '30px'
        },
        line: {
          background: 'transparent',
          border: `2px solid ${this.lineColor || '#e63362'}`,
          color: this.labelColor || '#e63362',
          width: this.width,
          height: this.height,
          fontSize: this.fontSize || '14px'
        },
        subtle: {
          background: 'transparent',
          color: this.$attrs.disabled ? '#ccc' : this.labelColor || '#1a1e1d',
          fontSize: '14px',
          fontWeight: 400,
          width: this.width,
          height: this.height
        }
      };

      let buttonStyleRules = buttonStyles[this.buttonType];

      if (this.icon) {
        if (this.iconAlign === 'right') {
          buttonStyleRules = {
            ...buttonStyles[this.buttonType],
            ...{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              padding: '0px 24.5px 0 22.5px'
            }
          };
        } else {
          buttonStyleRules = {
            ...buttonStyles[this.buttonType],
            ...{
              justifyContent: 'space-between',
              padding: '0 20px'
            }
          };
        }
      }

      return buttonStyleRules;
    },
    svgIcon() {
      return () =>
        import(
          /* webpackPrefetch: true */ `@/assets/images/icons/${this.icon}.svg`
        );
    },
    loadingColor() {
      return this.buttonType === 'line' || this.buttonType === 'subtle'
        ? '#000'
        : '#fff';
    }
  }
};
</script>

<style lang="scss" scoped>
.up-button {
  button {
    background-color: #e63362;
    border: none;
    outline: none;
    color: #fff;
    height: 55px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 11px 1px rgba(0, 0, 0, 0.27);
    border-radius: 10px;

    &[disabled='disabled'] {
      cursor: default;
    }
  }
}
</style>
