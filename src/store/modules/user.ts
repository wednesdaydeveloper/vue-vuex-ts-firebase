import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';

export interface State {
    uid: string | undefined;
    email: string | undefined;
}

export interface Getters {
    // getterName: returnType
    uid: string | undefined;
    email: string | undefined;
    loggedin: boolean;
}

export interface Mutations {
    // mutationName: mutationPayloadType
    setUser: {
        uid: string,
        email: string,
    };
}

export interface Actions {
    setUserAction: {
        uid: string,
        email: string,
    };
}

const getters: DefineGetters<Getters, State> = {
    uid: (state) => state.uid,
    email: (state) => state.email,
    loggedin: (state) => state.email !== undefined && state.uid !== undefined,
};

const mutations: DefineMutations<Mutations, State> = {
    setUser(state, payload) {
        state.uid = payload.uid;
        state.email = payload.email;
    },
};

const actions: DefineActions<Actions, State, Mutations, Getters> = {
    setUserAction({ commit }, payload) {
        commit('setUser', payload);
    },
};

export const {
    mapGetters,
    mapMutations,
    mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('user');

export const user = {
    namespaced: true,
    state: {},
    getters,
    mutations,
    actions,
};
