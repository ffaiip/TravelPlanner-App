import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            username: ' ',
            email: ' ',
        },
    },    
    mutations:{
        setUsername(state, name){
            state.user.username = name
        },
        setEmail(state, email){
            state.user.email = email
        }

    },
    actions: {
        username: ({ commit }, name) => commit('setUsername', name),
        email: ({ commit }, email) => commit('setEmail', email)
    },  
    getters: {
        getUsername: state => state.user.username,
        getEmail: state => state.user.email
    },

  });