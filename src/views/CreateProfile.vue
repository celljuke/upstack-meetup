<template>
  <div class="register">
    <div class="register__logo">
      <upstack-logo />
      <span class="register__logo__label">meetup</span>
    </div>
    <div class="register__background">
      <div class="register__background__wrapper">
        <div class="register__background__img">
          <home-illustration />
        </div>
        <div class="register__background__form-wrapper">
          <div class="register__background__form-wrapper__form">
            <h1>Create your profile</h1>
            <div class="form-elements">
              <form @submit.prevent="submitCreateProfile">
                <div class="up-input-wrapper">
                  <div class="up-input">
                    <div class="up-input__input-control">
                      <gmap-autocomplete @place_changed="getPlace" />
                    </div>
                  </div>
                </div>
                <div>
                  <textarea
                    class="up-textarea"
                    placeholder="Short bio"
                  ></textarea>
                </div>
                <div class="form-elements__buttons">
                  <up-button
                    label="Continue"
                    button-type="primary"
                    width="100%"
                    height="50px"
                    font-size="18px"
                    @click="submitCreateProfile"
                    :is-loading="isLoading"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeIllustration from '@/assets/onboarding-img.svg';
import UpstackLogo from '@/assets/upstack-logo.svg';
import UpButton from '@/components/UpButton';
import UpInput from '@/components/UpInput';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('authentication');
export default {
  name: 'CreateProfile',
  components: {
    HomeIllustration,
    UpstackLogo,
    UpButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      activeInputs: [],
      location: {},
      isLoading: false
    };
  },
  methods: {
    ...mapActions(['createProfile']),
    async getPlace(place) {
      const currentUser = JSON.parse(localStorage.getItem('activeUser'));
      this.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        city: place.name,
        user_uid: currentUser.uid
      };
    },
    setActive(type, add) {
      if (add) {
        this.activeInputs.push(type);
      } else {
        this.activeInputs = this.activeInputs.filter(a => a !== type);
      }
    },
    hasActive(type) {
      return !!this.activeInputs.find(a => a === type);
    },
    submitCreateProfile() {
      this.isLoading = true;
      this.createProfile({ location: this.location })
        .then(({ data }) => {
          this.$router.push('/dashboard');
        })
        .catch(error => {})
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__logo {
    position: absolute;
    width: 100%;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;

    &__label {
      font-size: 22px;
      color: #fff;
      font-family: 'Lobster', cursive;
    }
  }

  &__background {
    position: relative;
    height: 50%;
    width: 100%;
    background-image: linear-gradient(180deg, #008ff4 0%, #00c2fa 100%);

    &__wrapper {
      position: relative;
      width: 1440px;
      height: 100%;
      margin: 0 auto;

      @include xl {
        width: 1440px;
      }
      @include lg {
        width: 100%;
      }
      @include md {
        width: 100%;
      }
      @include xsm {
        width: 100%;
      }
    }

    &__img {
      position: absolute;
      left: calc(25% - 150px);
      bottom: -86px;
      @include xsm {
        display: none;
      }
    }

    &__form-wrapper {
      background: #ffffff;
      position: absolute;
      right: calc(25% - 125px);
      bottom: -250px;
      box-shadow: 0 18px 18px 6px rgba(0, 0, 0, 0.09);
      border-radius: 10px;
      width: 450px;

      @include xsm {
        position: relative;
        margin: 0 auto;
        margin-top: 150px;
        right: initial;
        bottom: initial;
        width: 85%;
      }

      &__form {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
          margin: 0;
          padding: 0;
          font-size: 24px;
        }

        .form-elements {
          margin-top: 30px;
          width: 100%;

          .up-textarea {
            width: 100%;
            height: 60px;
            border: none;
            border-radius: 6px;
            background-color: #f1f1f1;
            outline: none;
            margin-top: 20px;
            padding: 10px;
            font-size: 14px;
          }

          .up-input-wrapper {
            width: 100%;
          }

          .up-input-wrapper + div.up-input-wrapper {
            margin-top: 18.5px;
          }

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

          &__buttons {
            margin-top: 20px;

            div.up-button + div {
              margin-top: 20px;
            }
          }

          &__forgot {
            margin-top: 20px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
