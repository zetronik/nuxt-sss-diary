export const actions = {
    async fetchDiary ({commit}, week) {
        try {
            return await this.$axios.$get(`/api/diary/fetch/${week}`)
        } catch (e) {
            commit('setError', e, {root: true});
            throw e
        }
    },
    async writeIn ({commit}) {
        try {
            return await this.$axios.$get(`/api/diary/lesson`)
        } catch (e) {
            commit('setError', e, {root: true});
            throw e
        }
    },
    async save ({commit}, diary) {
        try {
            return await this.$axios.$put(`/api/diary/save`, diary)
        } catch (e) {
            commit('setError', e, {root: true});
            throw e
        }
    }
}