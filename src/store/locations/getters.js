export default {
  usersWithLocations: state => {
    return state.users.map(user => {
      const location = state.allLocations.find(
        l => l.user_uid === user.uid
      ) || { city: '', country: '' };
      return {
        ...user,
        location
      };
    });
  }
};
