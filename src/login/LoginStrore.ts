import { GetterTree, MutationTree, ActionTree } from 'vuex';

class LoginStore {
    token?: string;
    expire?: number;
}

const mutations = <MutationTree<LoginStore>>{
    setToken(state, payload): void {
        state.token = payload.token;
        state.expire = Date.parse(payload.expire);
    },
    removeToken(state): void {
        state.token = undefined;
        state.expire = undefined;
    }
};

// eslint-disable-next-line
const actions = <ActionTree<LoginStore, any>>{
    setToken(context, payload) {
        context.commit('setToken', payload);
    },
    removeToken(context) {
        context.commit('removeToken');
    }
};

// eslint-disable-next-line
const getters = <GetterTree<LoginStore, any>>{
    getToken(state): string | undefined {
        return state.token;
    },
    getExpire(state): number | undefined {
        return state.expire;
    },
    isAuthenticated(state): boolean {
        const tokenValid = state.token !== undefined && state.token !== "";
        const dateValid = state.expire !== undefined && state.expire > new Date().valueOf();
        
        return tokenValid && dateValid;
    }
};

const MySubModule = {
    namespaced: true,
    state: new LoginStore(),
    mutations: mutations,
    actions: actions,
    getters: getters,
};

export default MySubModule;