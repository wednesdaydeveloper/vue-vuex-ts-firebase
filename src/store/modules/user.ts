import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';
import firebase from 'firebase/app';
import router from '@/router';
import 'firebase/auth';

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
    logoutAction({ commit, dispatch }) {
        firebase.auth().signOut().then(() => {
            commit('logout', {});
            //  TodoのStateをクリア
            dispatch('todo/clearStateAction', {}, { root: true });
        });
    },
    signInAction({ commit, dispatch }, payload) {
        payload.callback((p: UserPayload) => {
            commit('setUser', p);
            //  TodoのStateを初期化
            dispatch('todo/initStateAction', {uid: p.uid}, { root: true });
        });
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
