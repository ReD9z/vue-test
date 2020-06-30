import Vue from 'vue';
import Vuex from 'vuex';
import Items from './modules/Items';
import Auth from './modules/Auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Items,
        Auth
    }
});
