<template>
  <v-app id="brag">

          <!--NAVIGATION BAR (LEFT)-->

    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-3"
      app
    >
      <navbar></navbar> <!--custom component-->
    </v-navigation-drawer>

          <!--TOOLBAR (TOP)-->

    <v-toolbar color="warning" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">BRAG&nbsp;<span class="font-weight-light">biomedical ranking</span></span>
      <searchbar></searchbar> <!--custom component-->
      <v-spacer></v-spacer>
    </v-toolbar>

          <!--MAIN APP CONTENT-->

    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout justify-center align-center>
          <v-flex>
            <span> author : {{ $store.state.lastName }}</span>
          </v-flex>
        </v-layout>
      </v-container>
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
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import SearchBar from './components/SearchBar.vue'

  export default {
    name: 'App',
    data: () => ({
      drawer: null,
      timeout: 3000
    }),

    methods: {
      
    },

    components: {
      navbar: NavBar,
      searchbar: SearchBar
    }
  }
</script>

<style lang="css">
  
</style>