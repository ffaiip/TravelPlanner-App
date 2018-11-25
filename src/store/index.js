import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);
  
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
        planner: [],
    },
    mutations: {
        createPlanner (state , payload) {
            state.loadedPlanners.push(payload)
        },
        addPlan (state, payload) {
            state.planner.push(payload)
        },
        addDivide (state, payload) {
            state.planner.push(payload)
        },
        addDuration (state, payload) {
            state.planner.push(payload)
        },
        setUsername(state, name){
            state.user.username = name
        },
        setEmail(state, email){
            state.user.email = email
        }
    },
    actions: {
        createPlanner ({commit}, payload) {
            const planner = {
                 topic: payload.topic,
                 imageUrl: payload.imageUrl,
                 date: payload.date,
                 id: 'vkgupn'
            }

            //Reach out to database and store it
            commit('createPlanner', planner)
        },
        addDuration ({ commit }, payload) {
            const placeDuration = { duration: payload.duration }
            commit('addDuration', placeDuration);
        },
        addDivide ({ commit }, payload) {
            const divide = { divider: true, inset: true };
            commit('addDivide', divide);
        },
        addPlan ({ commit }, payload) {
            const placeList = ( {
                avatar: 'https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising',
                time: payload.time,
                name: payload.name,
                spendtime: payload.spendtime,
                completed: false,
            })

            commit('addPlan', placeList)

        },
        username(state, name){
            state.commit('setUsername', name)
        },
        email(state, email){
            state.commit('setEmail', email)
        }
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
        featuredPlanners (state, getters) {
            return getters.loadedPlanners.slice(0, 5 )
        },
        loadedPlanner (state) {
            return (plannerId) => {
                return state.loadedPlanners.find((planner) => {
                    return planner.id === plannerId
                })
            }
        },
        getUsername: state => state.user.username,
        getEmail: state => state.user.email
    }

});