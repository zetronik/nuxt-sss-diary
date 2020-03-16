export const state = () => ({
  error: null
});

export const actions = {
  async nuxtServerInit({getters}) {
    await getters['auth/isAuthenticated']
  }
};

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
};

export const getters = {
  error: state => state.error
};
