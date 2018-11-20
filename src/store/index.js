import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedPlanners: [
            {
                imageUrl: 'https://wp-assets.dotproperty-kh.com/wp-content/uploads/sites/14/2016/10/28150318/Fotolia_116473721_Subscription_Monthly_M.jpg',
                id: '1',
                topic: 'Planner in Bangkok',
                date: '2018-10-31',
            },
            {
                imageUrl: 'https://www.viagemegastronomia.com.br/wp-content/uploads/2015/12/chiang-mai.jpg',
                id: '1234',
                topic: 'Planner in Chiang mai',
                date: '2018-11-10',
            },
        ],
        user: {
            username: ' ',
            email: ' ',
        },
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
                topic: payload.topic,
                imageUrl: payload.imageUrl,
                date: payload.date,
                id: 'vkgupn',
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
            console.log("เข้าเด้อ");
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
    },

});
