<template>
  <v-app id="brag" class="white">

          <!--NAVIGATION BAR (LEFT)-->

    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      absolute
      class="secondary"
      app
    >
      <navbar></navbar> <!--custom-made component-->
    </v-navigation-drawer>

          <!--TOOLBAR (TOP)-->

    <v-toolbar color="primary" app absolute clipped-left>
      <v-layout row>
        <v-flex sm4 xs2>
          <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
          <span class="title ml-3 mr-5 hidden-xs-only">BRAG&nbsp;<span class="font-weight-light hidden-sm-and-down">Biomedical RAnkinG</span></span>
        </v-flex>
        <v-flex sm6>
          <searchbar></searchbar> <!--custom-made component-->
        </v-flex>
      </v-layout>
    </v-toolbar>
  
          <!--MAIN APP CONTENT-->
    <v-content v-if="!$store.state.progress.show && !$store.state.searchResultsFound && !$store.state.searchDone">
      <welcome></welcome>
    </v-content>
    <v-content v-else>
      <v-container fluid grid-list-md>
        <v-layout column>
          <v-flex>
            <searchresult></searchresult> <!--custom-made component-->
          </v-flex>
          <v-flex md12 xs12>
            <v-layout row wrap>
              <v-flex md8 xs12>
                <v-layout column>
                  <v-flex>
                    <authorinfo></authorinfo> <!--custom-made component-->
                  </v-flex>
                  <v-flex>
                    <articles></articles> <!--custom-made component-->
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md4 sm6 xs12>
                <v-layout column>
                  <v-flex>
                    <publicationgraph></publicationgraph> <!--custom-made component-->
                  </v-flex>
                  <v-flex>
                    <citationgraph></citationgraph> <!--custom-made component-->
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
      <v-footer v-if="!$store.state.progress.show" color="secondary" height="auto">
          <v-layout column>
            <v-flex text-xs-center> 
              <span class="caption"><a :href="pubmedNotice">NCBI's Disclaimer and Copyright Notice</a></span>
            </v-flex>
            <v-flex  text-xs-center> 
              <span class="caption">Created our free logo at <a :href="logoMakr" color="black">LogoMakr.com</a></span>
            </v-flex>
          </v-layout>
    </v-footer>
    </v-content>

          <!--ALERTS-->
          
    <v-snackbar
        v-model="$store.state.alert.show"
        :color="$store.state.alert.type"
        :timeout="timeout"
        bottom
        >
          {{ $store.state.alert.message }}
      </v-snackbar>

              <!--FOOTER-->

    
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import SearchBar from './components/SearchBar.vue'
  import SearchResult from './components/SearchResult.vue'
  import Welcome from './components/Welcome.vue'
  import AuthorInfo from './components/AuthorInfo.vue'
  import Articles from './components/Articles.vue'
  import PublicationGraph from './components/PublicationGraph.vue'
  import CitationGraph from './components/CitationGraph.vue'

  export default {
    name: 'App',
    data: () => ({
      drawer: null,
      timeout: 3000,
      pubmedNotice: 'https://www.ncbi.nlm.nih.gov/home/about/policies/',
      logoMakr: 'https://logomakr.com/'
    }),

    methods: {
      
    },

    components: {
      navbar: NavBar,
      searchbar: SearchBar,
      searchresult: SearchResult,
      welcome: Welcome,
      authorinfo: AuthorInfo,
      articles: Articles,
      publicationgraph: PublicationGraph,
      citationgraph: CitationGraph,
    }
  }
</script>

<style lang="css">
  
</style>