import { createStore } from 'vuex'

const store = createStore({
    state: {
        token: null
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getToken: (state) => state.token
    }
})

export default store
