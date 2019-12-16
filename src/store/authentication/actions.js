import axiosInstance from '@/axios-instance';
import router from '@/router';

export default {
  login({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST');
      axiosInstance({
        url: '/login',
        data: user,
        method: 'POST'
      })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('activeUser', JSON.stringify(user));
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${token}`;
          commit('AUTH_SUCCESS', token, user);
          commit('SET_USER', user);
          resolve(resp);
        })
        .catch(err => {
          commit('AUTH_ERROR');

          localStorage.removeItem('token');
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return axiosInstance.post('register', user);
  },
  createProfile({ commit }, location) {
    return axiosInstance.post('locations', location);
  },
  validateEmail({ commit }, data) {
    return new Promise((resolve, reject) => {
      axiosInstance({
        url: 'validate-email',
        data,
        method: 'POST'
      })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      axiosInstance({
        url: 'password',
        data,
        method: 'PUT'
      })
        .then(response => {
          resolve(response);
          commit('SET_PASSWORD_SUCCESS');
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return axiosInstance.delete('/logout').then(() => {
      commit('LOGOUT');
      localStorage.removeItem('token');
      localStorage.removeItem('activeUser');
      delete axiosInstance.defaults.headers.common['Authorization'];
      router.push('/login');
    });
  },
  async getUser({ commit }) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get('api/v1/me')
        .then(response => {
          commit('SET_USER', response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
