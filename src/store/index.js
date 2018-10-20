import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

const defaultState = () => {
    return {
        lastName: '',
        foreName: '',
        initials: '',
        affiliation: [],
        articles: [],
        alert: {
            show: false,
            type: '',
            message: '' 
        }
    }
};

const state = defaultState();

const getters = {
    hIndex: (state) => {
        return 0; //to do
    },

    publicationCount: (state) => {
        return state.articles.length;
    },

    citationCount: (state) => {
        return 0; //to do
    }
};

const mutations = {
    setLastName: (state, lastName) => {
        state.lastName = lastName;
    },

    setForeName: (state, foreName) => {
        state.foreName = foreName;
    },

    setInitials: (state, initials) => {
        state.initials = initials;
    },

    setAffiliation: (state, affiliation) => {
        state.affiliation = affiliation;
    },

    setArticles: (state, articles) => {
        state.articles = articles;
    },

    setAlert: (state, alert) => {
        Object.assign(state.alert, alert);
    },

    resetState: (state) => {
        Object.assign(state, defaultState());
    }
};

const actions = {
    searchAuthor: ({commit, dispatch}, searchTerm) => {
        console.log('action dispatched');
        try {
            let author = api.searchAuthor(searchTerm);
            commit('setLastName', author.lastName);
            commit('setForeName', author.foreName);
            commit('setInitials', author.initials);
            commit('setAffiliation', author.affiliation);
            commit('setArticles', author.articles);
        }
        catch (err) {
            dispatch('showError', err);
        }
    },

    showInfo({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'info',
            message: message
        });
    },

    showSuccess({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'success',
            message: message
        });
    },

    showWarning({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'warning',
            message: message
        });
    },

    showError({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'error',
            message: message
        });
    }
};

export default new Vuex.Store({
      state,
      getters,
      mutations,
      actions
  })