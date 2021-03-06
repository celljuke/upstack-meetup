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
            <h1>Create an account</h1>
            <div class="form-elements">
              <form @submit.prevent="submitRegister">
                <up-input
                  v-model="firstName"
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  @focus="setActive('firstName', true)"
                  @blur="setActive('firstName', false)"
                  :height="55"
                  :is-active="hasActive('firstName') || !!firstName.length"
                  bg-color="#EAEAEA"
                />
                <up-input
                  v-model="lastName"
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  @focus="setActive('lastName', true)"
                  @blur="setActive('lastName', false)"
                  :height="55"
                  :is-active="hasActive('lastName') || !!lastName.length"
                  bg-color="#EAEAEA"
                />
                <up-input
                  v-model="email"
                  placeholder="Email"
                  type="text"
                  name="email"
                  @focus="setActive('mail', true)"
                  @blur="setActive('mail', false)"
                  :height="55"
                  :is-active="hasActive('mail') || !!email.length"
                  bg-color="#EAEAEA"
                />
                <up-input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  :height="55"
                  @focus="setActive('password', true)"
                  @blur="setActive('password', false)"
                  :is-active="hasActive('password') || !!password.length"
                  bg-color="#EAEAEA"
                />
                <div class="form-elements__buttons">
                  <up-button
                    label="Continue"
                    button-type="primary"
                    width="100%"
                    height="50px"
                    font-size="18px"
                    @click="submitRegister"
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
  name: 'Register',
  components: {
    HomeIllustration,
    UpstackLogo,
    UpInput,
    UpButton
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      activeInputs: [],
      isLoading: false
    };
  },
  methods: {
    ...mapActions(['register']),
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
    submitRegister() {
      this.isLoading = true;
      const credendials = {
        user: {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password
        }
      };
      this.register(credendials)
        .then(({ data }) => {
          this.$router.push('/create-profile');
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
      width: 350px;

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
          .up-input-wrapper {
            width: 100%;
          }

          .up-input-wrapper + div.up-input-wrapper {
            margin-top: 18.5px;
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
