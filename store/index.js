export const state = () => ({
  status: null,
  secret: ''
})
export const mutations = {
  SetStatus(state, payload) {
    state.status = payload
  },
  setSicret(state, payload) {
    state.secret = payload
  }
}
export const getters = {
  status: (state) => state.status,
  secret: (state) => state.secret
}
export const actions = {
  async create({ commit }, payload) {
    try {
      const create = await this.$axios.$post('/api/create', payload)
      commit('SetStatus', create)
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  },
  async login({ commit }, payload) {
    try {
      const log = await this.$axios.$post('/api/login', payload)
      commit('SetStatus', log)
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  },
  async verefy({ commit }, payload) {
    try {
      return await this.$axios.$post('/api/verefy', payload)
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  },
  async generator({ commit }) {
    try {
      const generator = await this.$axios.$get('/api/generator')
      commit('setSicret', generator.secret)
      return generator.image
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  },
  async verefyc({ commit }, payload) {
    try {
      const status = await this.$axios.$post('/api/verefyc', payload)
      commit('SetStatus', status)
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  }
}
