import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from '@/config';

//  firebaseを初期化
firebase.initializeApp(config);

//  firestoreを初期化
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

let collectionRef: firebase.firestore.CollectionReference | undefined;
let unsubscribe: (() => void) | undefined;

export enum FilterType {
  All = 101,
  Completed,
  Incomplete,
}

//  Todo1件あたりのインターフェイス
export interface TodoItem {
  content: string;
  done: boolean;
  id: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp | undefined;
}

export interface State {
  items: TodoItem[];
  filterType: FilterType;
}

export interface Getters {
  items: TodoItem[];
  filterName: string;
}

export interface Mutations {
  add: TodoItem;
  set: TodoItem;
  remove: TodoItem;
  changeFilterType: FilterType;
  initState: {
    state: State,
  };
  clearState: {};
}

export interface Actions {
  addAsync: TodoItem;
  setAsync: TodoItem;
  initStateAction: {
    uid: string,
  };
  clearStateAction: {};
}

function getFilter(filterType: FilterType): (ev: TodoItem) => boolean {
  if (filterType === FilterType.Completed) {
    return (e: TodoItem) => e.done;
  } else if (filterType === FilterType.Incomplete) {
    return (e: TodoItem) => !e.done;
  } else {
    return (e: TodoItem) => true;
  }
}
const getters: DefineGetters<Getters, State> = {
  items: (state) => {
    const predicate = getFilter(state.filterType);

    return state.items.slice()
      .filter(predicate)
      .sort((a1: TodoItem, a2: TodoItem) => a1.createdAt > a2.createdAt ? 1 : -1);
  },
  filterName: (state) => {
    return FilterType[state.filterType];
  },
};

const mutations: DefineMutations<Mutations, State> = {
  add(state, payload: TodoItem) {
    state.items.push({ ...payload });
  },
  set(state, payload: TodoItem) {
    const index = state.items.findIndex((item) => item.id === payload.id);
    if (index !== -1) {
      Vue.set(state.items, index, payload);
    }
  },
  remove(state, payload: TodoItem) {
    state.items = state.items.filter((item) => item.id === payload.id);
  },
  changeFilterType(state, payload: FilterType) {
    state.filterType = payload;
  },
  initState(state, payload) {
    state.items = payload.items;
  },
  clearState(state) {
    state.items = [];
    state.filterType = FilterType.All;
    collectionRef = undefined;
    if (unsubscribe) {
      unsubscribe();
    }
    unsubscribe = undefined;
  },
};

const actions: DefineActions<Actions, State, Mutations, Getters> = {
  addAsync({}, payload) {
    if (collectionRef) {
      const item: TodoItem = {
        ...payload,
        createdAt: firebase.firestore.Timestamp.now(),
      };
      delete item.id;
      collectionRef.add(item).catch((error) => {
          console.error('Error adding document: ', error);
      });
    }
  },

  setAsync({}, payload) {
    if (collectionRef) {
      const item: TodoItem = {
        ...payload,
        updatedAt: firebase.firestore.Timestamp.now(),
      };
      delete item.id;
      collectionRef.doc(payload.id).set(item).catch((error) => {
          console.error('Error settig document: ', error);
      });
    }
  },
  initStateAction({ commit }, { uid }) {
    collectionRef = firestore.collection('users').doc(uid).collection('todolist');

    unsubscribe = collectionRef.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {

      snapshot.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
        const data: TodoItem = change.doc.data() as TodoItem;
        const payload: TodoItem = {
          ...data,
          id: change.doc.id,
        };
        if (change.type === 'added') {
          commit('add', payload);
        } else if (change.type === 'modified') {
          commit('set', payload);
        } else if (change.type === 'removed') {
          commit('remove', payload);
        }
      });

    }, (error) => {
      console.error('Error onSnapshot: ', error);
    });
  },
  clearStateAction({ commit }, payload) {
    commit('clearState', {});
  },
};

export const {
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('todo');

export const todo = {
  namespaced: true,
  state: {
    items: [],
    filterType: FilterType.All,
  },
  getters,
  mutations,
  actions,
};
