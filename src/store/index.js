import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
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
    username(state, name){
      state.commit('setUsername', name)
    },
    email(state, email){
      state.commit('setEmail', email)
    }
  },  
  getters: {
    getUsername: state => state.user.username,
    getEmail: state => state.user.email
  },

});
