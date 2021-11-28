import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import login from '../login/LoginStrore';

export default createStore({
  state: {
    token: "",
    test: "",
  },
  getters: {
    TOKEN: state => {
      return state.token;
    },
    IS_AUTHENTICATED: state => {
      return state.token !== "";
    }
  },
  mutations: {
    SET_TOKEN_: (state, payload: string) => {
      state.token = payload;
    },
    SET_TEST_: (state, payload: string) => {
      state.test = payload;
    }
  },
  actions: {
    SET_TOKEN: (context, payload: string) => {
      context.commit('SET_TOKEN_', payload);
    },
    SET_TEST: (context, payload: string) => {
      context.commit('SET_TEST_', payload);
    }
  },
  modules: {
    login: login
  },
  plugins: [createPersistedState()],
})
