import Vue from 'vue';
import Vuex from 'vuex';
import { searchAuthorPM, searchAuthorGS, sortArticles, crossArticleLists,
    ERROR_NO_PUBMED_RESULT } from '../utils';

Vue.use(Vuex)

const defaultState = () => {
    return {
        searchDone: false,
        searchResultsFound: false,
        searchTerm: '',
        name: '',
        hIndex: 0,
        articles: [],
        citationCount: 0,
        citationGraph: undefined,
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

    publicationGraph: (state) => {
        let pubsPerYear = {};
        for (let pub of state.articles) {
            if (pub.journal.year) {
                const pubCount = pubsPerYear[pub.journal.year];
                pubsPerYear[pub.journal.year] = pubCount ? pubCount+1 : 1;
            }
        }
        return {
            labels: Object.keys(pubsPerYear),
            datasets: [
                {
                    label: 'Number of publications',
                    backgroundColor: '#4caf50',
                    data: Object.values(pubsPerYear)
                }
            ]
        }
    },

    sorted: (state) => {
        return sortArticles(state.articles, state.sortBy);
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

    setName: (state, name) => {
        state.name = name;
    },

    setHIndex: (state, hIndex) => {
        state.hIndex = hIndex;
    },

    setArticles: (state, articles) => {
        state.articles = articles;
    },

    setCitationCount: (state, citationCount) => {
        state.citationCount = citationCount;
    },

    setCitationGraph: (state, citesPerYear) => {
        if (citesPerYear) {
            state.citationGraph = {
                labels: Object.keys(citesPerYear),
                datasets: [
                    {
                        label: 'Number of citations',
                        backgroundColor: '#2196f3',
                        data: Object.values(citesPerYear)
                    }
                ]
            }
        }
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
        let pm, gs;
        try {
            dispatch('showProgress', 'Fetching results from PubMed');
            pm = await searchAuthorPM(searchTerm);
            dispatch('showProgress', 'Fetching results from Google Scholar');
            gs = await searchAuthorGS(searchTerm);
            crossArticleLists(pm, gs.articles);
            commit('setArticles', pm);
            commit('setName', gs.name)
            commit('setHIndex', gs.hIndex);
            commit('setCitationCount', gs.citationCount);
            commit('setCitationGraph', gs.citesPerYear);
            dispatch('showSuccess', 'Search finished successfully!');
            dispatch('hideProgress');
            commit('setSearchResultsFound', true);
        }
        catch (err) {
            dispatch('showError', String(err));
            if (err === ERROR_NO_PUBMED_RESULT) {
                commit('setArticles', []);
                commit('setSearchResultsFound', false);
            }
            else { //ERROR_NO_GOOGLE_SCHOLAR_RESULT or ERROR_FORBIDDEN_GOOGLE_SCHOLAR_ACCESS or NETWORK ERROR 
                flattenPMArticles(pm);
                commit('setArticles', pm);
                commit('setName', 'No Google Scholar results...');
                commit('setHIndex', '-');
                commit('setCitationCount', '-');
                commit('setCitationGraph', undefined);
                commit('setSearchResultsFound', true);
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
