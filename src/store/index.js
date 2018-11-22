import Vue from 'vue';
import Vuex from 'vuex';
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
    },
    mutations: {
        createPlanner (state , payload) {
            state.loadedPlanners.push(payload)
        },
        setUsername(state, name){
            state.user.username = name
        },
        setEmail(state, email){
            state.user.email = email
        },

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
        username(state, name){
            state.commit('setUsername', name)
        },
        email(state, email){
            state.commit('setEmail', email)
        },

    },
    getters: {
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
        getEmail: state => state.user.email,

        getCookie: state => key => Vue.cookie.get(key),
        Cookie: state => (key, value) => Vue.cookie.set(key, value)
    }

});
