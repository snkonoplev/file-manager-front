import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { User } from '../services/User';

class LoginStore {
    token?: string;
    expire?: number;
    currentUser?: User;
}

const mutations = <MutationTree<LoginStore>>{
    setToken(state, payload): void {
        state.token = payload.token;
        state.expire = Date.parse(payload.expire);
    },
    removeToken(state): void {
        state.token = undefined;
        state.expire = undefined;
        state.currentUser = undefined;
    },
    setCurrentUser(state, payload): void {
        state.currentUser = payload;
    }
};

// eslint-disable-next-line
const actions = <ActionTree<LoginStore, any>>{
    setToken(context, payload) {
        context.commit('setToken', payload);
    },
    removeToken(context) {
        context.commit('removeToken');
    },
    setCurrentUser(context, payload) {
        context.commit('setCurrentUser', payload);
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
    },
    getCurrentUser(state): User | undefined {
        return state.currentUser;
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