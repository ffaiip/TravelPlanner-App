import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedPlanners: [
            { imageUrl: 'https://wp-assets.dotproperty-kh.com/wp-content/uploads/sites/14/2016/10/28150318/Fotolia_116473721_Subscription_Monthly_M.jpg', 
                id: '1', title:"Planner in Bangkok"},
        ],
        user: {
            id: 'ugufkjh',
            registeredPlanner: ['kvjhfuch']
        }
    },
    mutations: {},
    actions: {},
    getters: {}

})