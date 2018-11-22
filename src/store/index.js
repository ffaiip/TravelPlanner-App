import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';
import VueCookie from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookie);

export const store = new Vuex.Store({
    state: {
        loadedPlanners: [
            { imageUrl: 'https://wp-assets.dotproperty-kh.com/wp-content/uploads/sites/14/2016/10/28150318/Fotolia_116473721_Subscription_Monthly_M.jpg', 
                id: '1',  
                topic:"Planner in Bangkok",
                date: '2018-10-31'
            },
            { imageUrl: 'https://www.viagemegastronomia.com.br/wp-content/uploads/2015/12/chiang-mai.jpg', 
                id: '1234', 
                topic:"Planner in Chiang mai",
                date: '2018-11-10'
            },
        ],
        user: {
            username: ' ',
            email: ' ',
        },
        idPlan: '01',
        plan: {
            planner: [],
            planID: ' ',
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
        },
        addPlan (state, payload, plannerId) {
            state.plan.planner.push(payload)
            state.plan.planID = plannerId
        },
        addDivide (state, payload) {
            state.planner.push(payload)
        },
        addDuration (state, payload) {
            state.planner.push(payload)
        },
        
        setIdPlan(state) {
            state.idPlan = Math.random().toString(36).substr(2, 9);
        }

    },
    actions: {

        async fetchUserData({ commit, getters }, payload) {
            console.log("เข้า");
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
        addDuration ({ commit }, payload) {
            const placeDuration = { duration: payload.duration }
            commit('addDuration', placeDuration);
        },
        addDivide ({ commit }, payload) {
            const divide = { divider: true, inset: true };
            commit('addDivide', divide);
        },
        addPlan ({ commit, getters }, payload) {
            const placeList = ( {
                avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
                time: payload.time,
                name: payload.name,
                spendtime: payload.spendtime,
                completed: false,
            })

            const planID = getters.loadedPlanner

            commit('addPlan', placeList, planID)

        },
        username(state, name){
            state.commit('setUsername', name)
        },
        email(state, email) {
            state.commit('setEmail', email);
        },
        clearCreatePlanner(state) {
            state.commit('clearCreatePlanner');
        },

    },
    getters: {
        getPlan (state) {
            return state.planner
        },
        loadedPlanners (state) {
            return state.loadedPlanners.sort((plannerA, plannerB) => {
                return plannerA.date > plannerB.date 
            }) 
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

        getCookie: state => key => Vue.cookie.get(key),
        Cookie: state => (key, value) => Vue.cookie.set(key, value)
    }


});
