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
        }
    }
};

const state = defaultState();

const getters = {
    publicationCount: (state) => {
        if (state.articles!==undefined) {
            return state.articles.length;
        }
        return 0;
    },

    citationCount: (state) => {
        if (state.articles!==undefined) {
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
            dispatch('showInfo', 'Fetching results from PubMed');
            const articlesPM = await searchAuthorPM(searchTerm);
            commit('setArticles', articlesPM);
            /*commit('setLastName', author.lastName);
            commit('setForeName', author.foreName);
            commit('setInitials', author.initials);*/
            dispatch('showInfo', 'Fetching results from Google Scholar');
            const gs = await searchAuthorGS(searchTerm);
            commit('setHIndex', gs.hIndex);
            dispatch('showSuccess', 'Search finished successfully');
            commit('setSearchResultsFound', true);
        }
        catch (err) {
            if (err === 'no result')
                commit('setSearchResultsFound', false);
            else
                dispatch('showError', String(err));
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
    }
};

export default new Vuex.Store({
      state,
      getters,
      mutations,
      actions
  })
