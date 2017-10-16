import { deepCopy } from '../../assets/utils/util'

// initial state
const state = {
  token: ''
}

const defaultValue = deepCopy(state)

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  TOKEN_INIT (state) {
    window.$globalHub.$store.state.auth = defaultValue
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
