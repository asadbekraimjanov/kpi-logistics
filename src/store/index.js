import { createStore } from 'vuex'

const store = createStore({
    state: {
        userData: null
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getToken: (state) => state.userData
    }
})

export default store
