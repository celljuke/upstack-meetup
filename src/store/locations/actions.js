import axiosInstance from '@/axios-instance';

export default {
  async getAllUsers({ commit }) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('users');
      await commit('SET_USERS', data);
      resolve(data);
    });
  },
  async getAllLocations({ commit }) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('locations');
      await commit('SET_LOCATIONS', data);
      resolve(data);
    });
  },
  async getMyMessages({ commit }, to_uid) {
    return new Promise(async (resolve, reject) => {
      const { data } = await axiosInstance.get('messages', {
        params: { to_uid }
      });

      await commit('SET_MESSAGES', data);
      resolve(data);
    });
  },
  getUsersbyCoord({ commit }, coords) {
    return axiosInstance.get('locations', { params: { ...coords } });
  }
};
