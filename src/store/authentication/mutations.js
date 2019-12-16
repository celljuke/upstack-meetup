export default {
  AUTH_REQUEST(state) {
    state.status = 'loading';
  },
  AUTH_SUCCESS(state, token, user) {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  AUTH_ERROR(state) {
    state.status = 'error';
  },
  SET_PASSWORD_SUCCESS(state) {
    state.status = 'success';
  },
  LOGOUT(state) {
    state.status = '';
    state.token = '';
  },
  SET_USER(state, user) {
    state.user = user;
  },
  setRegisteredUser(state, user) {
    state.registeredUser = user;
  }
};
