import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedPlanners: [


        ],
        user: {
            username: ' ',
            email: ' ',
        },
        idPlan: '01',
    },
    mutations: {
        createPlanner(state, payload) {
            state.loadedPlanners.push(payload);
        },
        setUsername(state, name) {
            state.user.username = name;
        },
        setEmail(state, email) {
            state.user.email = email;
        },
        clearCreatePlanner(state) {
            state.loadedPlanners = [];
        },
        setIdPlan(state) {
            state.idPlan = Math.random().toString(36).substr(2, 9);
        }
    },
    actions: {

        async fetchUserData({ commit, getters }, payload) {
            console.log(getters.getEmail);
            const bodyUser = {
                email: getters.getEmail,
            };
            try {
                const userDate = await axios.post(
                    'http://127.0.0.1:8000/user_data/',
                    bodyUser,
                );
                console.log(userDate.data[0]);

                for (let i = 0; i < userDate.data.length; i++) {
                    const UserData = {
                        topic: userDate.data[i]['name'],
                        imageUrl:
                            'https://d3r8gwkgo0io6y.cloudfront.net/upload/New_York_City.jpg',
                        date: userDate.data[i]['date'],
                        id: userDate.data[i]['id'],
                    };
                    commit('createPlanner', UserData);

                }
            } catch (error) {
                console.log(error);
            }
        },

        createPlanner({ commit }, payload) {
            const planner = {
                imageUrl: payload.imageUrl,
                id: payload.id,
                topic: payload.topic,
                date: payload.date,
            };
            // Reach out to database and store it
            commit('createPlanner', planner);
        },
        username(state, name) {
            state.commit('setUsername', name);
        },
        email(state, email) {
            state.commit('setEmail', email);
        },
        clearCreatePlanner(state) {
            state.commit('clearCreatePlanner');
        },
    },
    getters: {
        loadedPlanners(state) {
            return state.loadedPlanners.sort((plannerA, plannerB) => plannerA.date > plannerB.date);
        },
        featuredPlanners(state, getters) {
            return getters.loadedPlanners.slice(0, 5);
        },
        loadedPlanner(state) {
            return plannerId => state.loadedPlanners.find(planner => planner.id === plannerId);
        },
        getUsername: state => state.user.username,
        getEmail: state => state.user.email,
        getId: state => state.idPlan,
    },

});
