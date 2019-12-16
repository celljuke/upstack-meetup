import axiosInstance from '@/axios-instance';

export default {
  async getAllUsers({ commit }) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('users');
      resolve(data);
      commit('SET_USERS', data);
    });
  },
  async getAllLocations({ commit }) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('locations');
      resolve(data);
      commit('SET_LOCATIONS', data);
    });
  },
  async getAllMessages({ commit }) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('messages');
      resolve(data);
      commit('SET_MESSAGES', data);
    });
  },
  getUsersbyCoord({ commit }, coords) {
    return axiosInstance.get('locations', { params: { ...coords } });
  }
};
