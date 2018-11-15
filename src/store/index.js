import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  
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
            id: 'aajkbd',
            registeredPlanner: ['1']
        }
    },
    mutations: {
        createPlanner (state , payload) {
            state.loadedPlanners.push(payload)
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
        }
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
        }
    }

})