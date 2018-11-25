import Vue from 'vue';
import Vuex from 'vuex';
import {user} from '@/store/modules/user';
import {todo} from '@/store/modules/todo';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        todo,
    },
    strict: debug,
});
