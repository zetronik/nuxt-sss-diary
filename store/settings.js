export const actions = {
  async user ({commit}, formData) {
    try {
      return await this.$axios.$post('/api/settings/user', formData)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async fetchUser ({commit}) {
    try {
      return await this.$axios.$get(`/api/settings/user`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async changeEmail ({commit}, {login}) {
    try {
      await this.$axios.$put(`/api/settings/change/email`, {login});
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async changePass ({commit}, {pass}) {
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
  async deleteClass ({commit}) {
    try {
      return await this.$axios.$delete(`/api/settings/school/class/delete`);
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
  async schoolJoin ({commit}, id) {
    try {
      return await this.$axios.$put(`/api/settings/school/join/created/${id}`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async joinDelete ({commit}) {
    try {
      return await this.$axios.$delete(`/api/settings/school/join/delete`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async studentAccess ({commit}, user) {
    try {
      return await this.$axios.$put(`/api/settings/school/settings/access`, user);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async save ({commit}, lesson) {
    try {
      return await this.$axios.$put(`/api/settings/lesson/save`, lesson);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  }
};
