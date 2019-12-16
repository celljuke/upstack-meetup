<template>
  <div
    class="up-input-wrapper"
    @mouseenter="isRemoveVisible = true"
    @mouseleave="isRemoveVisible = false"
  >
    <div
      class="up-input"
      :class="{
        'has-error': hasError,
        'icon-right': iconAlign === 'right'
      }"
      :style="[backColor, shadow, inputWidth, iconAlignment, inputHeight]"
    >
      <div
        class="up-input__icon"
        :class="{ active: isActive }"
        v-if="icon"
        :style="[iconBackColor, iconColorStyle]"
        @click="$emit('on-icon-click')"
        v-tooltip="iconTooltip"
      >
        <component :is="svgIcon" />
      </div>
      <div class="up-input__input-control" :class="{ 'no-icon': !icon }">
        <input
          v-bind="$attrs"
          :name="name"
          :type="inputType"
          v-on="listeners"
        />
      </div>
      <div
        v-if="isPassword"
        @click="toggleInputType"
        class="up-input__eye-icon-wrapper"
      >
        <eye-icon />
      </div>
      <div
        v-if="hasRemove && isRemoveVisible"
        @click="$emit('remove-click')"
        class="up-input__close-wrapper"
      >
        <close-icon />
      </div>
    </div>
    <div class="up-input-errors" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import eyeIcon from '@/assets/images/icons/eye.svg';
import closeIcon from '@/assets/images/icons/close.svg';

export default {
  name: 'UpInput',
  components: {
    eyeIcon,
    closeIcon
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    iconAlign: {
      type: String,
      default: 'left'
    },
    iconBackground: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    iconTooltip: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    hasRemove: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    validationRules: {
      type: String,
      default: null
    },
    bgColor: {
      type: String,
      default: '#f1f1f1'
    },
    hasShadow: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: Number,
      default: 70
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputType: this.$attrs.type,
      isRemoveVisible: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      };
    },
    svgIcon() {
      return () =>
        import(
          /* webpackPrefetch: true */ `@/assets/images/icons/${this.icon}.svg`
        );
    },
    backColor() {
      return { backgroundColor: this.bgColor };
    },
    iconBackColor() {
      return { backgroundColor: this.iconBackground };
    },
    iconColorStyle() {
      return { color: this.iconColor };
    },
    shadow() {
      return this.hasShadow
        ? { boxShadow: '0px 6px 20px 0px rgba(219, 219, 219, 0.5)' }
        : null;
    },
    inputWidth() {
      return {
        width: `${this.width}${typeof this.width === 'number' ? 'px' : ''}`
      };
    },
    inputHeight() {
      return {
        height: `${this.height}px`
      };
    },
    iconAlignment() {
      return this.iconAlign === 'right'
        ? { flexDirection: 'row-reverse' }
        : null;
    },
    isPassword() {
      return this.$attrs.type === 'password' && this.$attrs.value.length;
    }
  },
  methods: {
    toggleInputType() {
      this.inputType = this.inputType === 'text' ? 'password' : 'text';
    }
  }
};
</script>

<style lang="scss" scoped>
.up-input-wrapper {
  @include xsm {
    width: 100%;
  }

  .up-input {
    height: 70px;
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
</style>
