import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  id: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setId(state, id) {
    state.id = id
  },
  clearToken(state) {
    state.token = null
    state.id = null
  }
};

export const actions = {
  async login({commit, dispatch}, formData) {
    try {
      const id = await this.$axios.$post('/api/auth/login', formData)
      const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

      const cookies = Cookie.parse(cookieStr || '') || {};
      const token = cookies['token-session'];
      const jwtData = jwtDecode(token)
      dispatch('setId', id)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async logout({commit}) {
    try {
      await this.$axios.$get('/api/auth/logout')
      commit('clearToken')
      Cookies.remove('token-session')
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  async createUser({commit}, formData) {
    try {
      return await this.$axios.$post('/api/auth/registration', formData)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  setToken({commit}, token) {
    commit('setToken', token)
  },
  setId({commit}, id) {
    commit('setId', id)
  },
  async autoLogin ({dispatch, commit}) {
    try {
      const cookieStr = process.browser
        ? document.cookie
        : this.app.context.req.headers.cookie;
        const cookies = Cookie.parse(cookieStr || '') || {};
        const token =  cookies['token-session'];
        
      if (token) {
        const jwtData = jwtDecode(token)
        dispatch('setId', jwtData.userId)
        dispatch('setToken', token)
      } else {
        dispatch('logout')
      }
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
    
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.token
  },
  token: state => state.token,
  getId: state => state.id
}
