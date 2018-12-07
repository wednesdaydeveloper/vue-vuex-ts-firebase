import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import config from '@/config';

// //  firebaseを初期化
// firebase.initializeApp(config);

//  firestoreを初期化
// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true });

// let collectionRef: firebase.firestore.CollectionReference | undefined;
// let unsubscribe: (() => void) | undefined;

//  Todo1件あたりのインターフェイス
export interface Message {
  id: string;
  user: string;
  content: boolean;
  createdAt: string;
  // createdAt: firebase.firestore.Timestamp;
}

export interface State {
  messages: Message[];
  currentRoom: string;
  rooms: string[];
}

export interface Getters {
  messages: Message[];
  currentRoom: string;
  rooms: string[];
}

export interface Mutations {
  addMessage: Message,
}

export interface Actions {
}

const getters: DefineGetters<Getters, State> = {
  messages: (state) => state.messages,
  currentRoom: (state) => state.currentRoom,
  rooms: (state) => state.rooms,
};

const mutations: DefineMutations<Mutations, State> = {
  addMessage(state, payload: Message) {
    state.messages.push({ ...payload });
  },
};

const actions: DefineActions<Actions, State, Mutations, Getters> = {
};

export const {
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers<State, Getters, Mutations, Actions>('chatroom');

export const chatroom = {
  namespaced: true,
  state: {
    messages: [
      {id: '1001', user: 'user1', content: 'こんにちは1', createdAt: '09:01'},
      {id: '1002', user: 'user2', content: 'こんにちは2', createdAt: '09:02'},
      {id: '1003', user: 'user3', content: 'こんにちは3', createdAt: '09:0'},
      {id: '1004', user: 'user4', content: 'こんにちは4', createdAt: '09:0'},
      {id: '1005', user: 'user5', content: 'こんにちは5', createdAt: '09:0'},
      {id: '1006', user: 'user6', content: 'こんにちは6', createdAt: '09:0'},
      {id: '1007', user: 'user7', content: 'こんにちは7', createdAt: '09:0'},
      {id: '1008', user: 'user8', content: 'こんにちは8', createdAt: '09:0'},
      {id: '1009', user: 'user9', content: 'こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9こんにちは9', createdAt: '09:0'},
    ],
  },
  getters,
  mutations,
  actions,
};
