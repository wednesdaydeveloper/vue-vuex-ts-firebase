import Vue from 'vue';
import Vuex from 'vuex';
import {user} from '@/store/modules/user';
import {todo} from '@/store/modules/todo';
import {chatroom} from '@/store/modules/chatroom';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        todo,
        chatroom,
    },
    strict: debug,
});
