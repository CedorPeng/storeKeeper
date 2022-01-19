export default {
  state: {
    params_MapActions: null,
    params_$store: null,

  },
  getters: {
    getMapActionsParams: state => {
      return state.params_MapActions
    },
    get$storeParams: state => {
      return state.params
    },
  },
  actions: {
    clickMapActionsParams({state, commit}, data) {
      commit('setMapActionsParams', data)
    },
    click$storeParams({state, commit}, data) {
      commit('set$storeParams', data)
    }
  },
  mutations: {
    setMapActionsParams(state, data) {
      state.params_MapActions = data
    },
    set$storeParams(state, data) {
      state.params_$store = data
    }
  }
}
