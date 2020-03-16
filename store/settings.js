export const actions = {
  async user ({commit}, formData) {
    try {
      return await this.$axios.$post('/api/settings/user', formData)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async fetchUser ({commit}, id) {
    try {
      return await this.$axios.$get(`/api/settings/user`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async changeEmail ({commit}, {id, login}) {
    try {
      await this.$axios.$put(`/api/settings/change/email`, {login});
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async changePass ({commit}, {id, pass}) {
    try {
      await this.$axios.$put(`/api/settings/change/pass`, {pass});
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async createClass ({commit}, formData) {
    try {
      return await this.$axios.$put(`/api/settings/school/class`, formData);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async serchSchool ({commit}, id) {
    try {
      return await this.$axios.$get(`/api/settings/school/serch/${id}`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async save ({commit}, {id, weekLesson}) {
    try {
      return await this.$axios.$put(`/api/settings/lesson/save/${id}`, weekLesson);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  }
};
