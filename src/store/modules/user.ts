import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';
import firebase from 'firebase/app';
import router from '@/router';

export interface State {
    uid: string | undefined;
    email: string | undefined;
}

export interface Getters {
    uid: string | undefined;
    email: string | undefined;
    loggedin: boolean;
}

export interface UserPayload {
    uid: string;
    email: string;
}

export interface Mutations {
    setUser: UserPayload;
    logout: {};
}

export interface Actions {
    logoutAction: {};
    signInAction: {
        callback: any,
    };
}

const getters: DefineGetters<Getters, State> = {
    uid: (state) => state.uid,
    email: (state: State) => state.email,
    loggedin: (state) => state.email !== undefined,
};

const mutations: DefineMutations<Mutations, State> = {
    setUser(state, payload) {
        state.uid = payload.uid;
        state.email = payload.email;
        router.push('/');
    },
    logout(state) {
        state.uid = undefined;
        state.email = undefined;
        router.push('/signin');
    },
};

const actions: DefineActions<Actions, State, Mutations, Getters> = {
    logoutAction({ commit }) {
        firebase.auth().signOut().then(() => {
            commit('logout', {});
        });
    },
    signInAction({ commit }, payload) {
        payload.callback((p: UserPayload) => commit('setUser', p));
    },
};

export const {
    mapGetters,
    mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('user');

export const user = {
    namespaced: true,
    state: {
        uid: undefined,
        email: undefined,
    },
    getters,
    mutations,
    actions,
};
