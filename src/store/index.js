import Vue from 'vue'
import Vuex from 'vuex'
import { searchAuthorPM, searchAuthorGS } from '../utils'

Vue.use(Vuex)

const defaultState = () => {
    return {
        searchDone: false,
        searchResultsFound: false,
        searchTerm: '',
        lastName: '',
        foreName: '',
        initials: '',
        hIndex: 0,
        articles: [],
        alert: {
            show: false,
            type: '',
            message: ''
        },
        sortBy: {
            field: '',
            descending: false
        },
        progress: {
            show: false,
            message: ''
        }
    }
};

const state = defaultState();

const getters = {
    publicationCount: (state) => {
        if (state.articles) {
            return state.articles.length;
        }
        return 0;
    },

    citationCount: (state) => {
        if (state.articles) {
            return state.articles.reduce((accumulator, article) => {
                return accumulator + article.citationCount;
            }, 0);
        }
        return 0;
    }
};

const mutations = {
    setSearchDone: (state, searchDone) => {
        state.searchDone = searchDone;
    },

    setSearchResultsFound: (state, searchResultsFound) => {
        state.searchResultsFound = searchResultsFound;
    },

    setSearchTerm: (state, searchTerm) => {
        state.searchTerm = searchTerm;
    },

    setLastName: (state, lastName) => {
        state.lastName = lastName;
    },

    setForeName: (state, foreName) => {
        state.foreName = foreName;
    },

    setInitials: (state, initials) => {
        state.initials = initials;
    },

    setHIndex: (state, hIndex) => {
        state.hIndex = hIndex;
    },

    setArticles: (state, articles) => {
        state.articles = articles;
    },

    setAlert: (state, alert) => {
        Object.assign(state.alert, alert);
    },

    setSortBy: (state, params) => {
        Object.assign(state.sortBy,
            {field: params.field, descending: params.descending});
    },

    setProgress: (state, progress) => {
        Object.assign(state.progress, progress);
    },

    resetState: (state) => {
        Object.assign(state, defaultState());
    }
};

const actions = {
    async searchAuthor ({commit, dispatch}, searchTerm) {
        commit('setSearchResultsFound', false);
        commit('setSearchDone', true);
        commit('setSearchTerm', searchTerm);
        try {
            dispatch('showProgress', 'Fetching results from PubMed');
            const articlesPM = await searchAuthorPM(searchTerm);
            commit('setArticles', articlesPM);
            /*commit('setLastName', author.lastName);
            commit('setForeName', author.foreName);
            commit('setInitials', author.initials);*/
            dispatch('showProgress', 'Fetching results from Google Scholar');
            const gs = await searchAuthorGS(searchTerm);
            commit('setHIndex', gs.hIndex);
            dispatch('showSuccess', 'Search finished successfully');
            dispatch('hideProgress');
            commit('setSearchResultsFound', true);
        }
        catch (err) {
            if (err === 'no result') {
                dispatch('showError', 'No results found');
                commit('setSearchResultsFound', false);
            }
            else {
                dispatch('showError', String(err));
            }
            dispatch('hideProgress');
        }
    },

    showInfo ({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'info',
            message: message
        });
    },

    showSuccess ({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'success',
            message: message
        });
    },

    showWarning ({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'warning',
            message: message
        });
    },

    showError ({commit}, message) {
        commit('setAlert', {
            show: true,
            type: 'error',
            message: message
        });
    },

    setSortBy ({commit}, params) {
        commit('setSortBy', params);
    },

    showProgress ({commit}, message) {
        commit('setProgress', {
            show: true,
            message: message
        });
    },

    hideProgress ({commit}) {
        commit('setProgress', {
            show: false,
            message: ''
        });
    }
};

export default new Vuex.Store({
      state,
      getters,
      mutations,
      actions
  })
