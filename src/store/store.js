import Vue from 'vue'
import Vuex from 'vuex'
//import api from '../api'

Vue.use(Vuex)

const state = {
    author: '',
    publicationSet: []
}

const getters = {
    getPublicationsCount: (state) => {
        return state.publicationSet.size()
    }
}

const mutations = {
    setAuthor: (state, author) => {
        state.author = author
    },

    setPublicationSet: (state, publicationSet) => {
        state.publicationSet = publicationSet
    },

    reset: (state) => {
        state.author = ''
        state.publicationSet = []
    }
}

const actions = {
    /*async loadPeople ({ commit }) {
        try {
            var people = await api.getEntities()
            commit('loadPeople', people)
        }
        catch (err) {
            await api.show(err.message)
        }
    },
    async createEntity ({ state }, entityData) {
        try {
            var entity = await api.createEntity(entityData)
            await api.show('New contact created')
            state.people.push(entity) 
        }
        catch (err) {
            await api.show(err.message)
        }
    }*/
}

export default new Vuex.Store({
      state,
      getters,
      mutations,
      actions
  })