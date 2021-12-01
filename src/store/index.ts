import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import login from '../login/LoginStrore';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login: login
  },
  plugins: [createPersistedState()],
})
