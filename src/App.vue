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
      <navbar></navbar>
    </v-navigation-drawer>

          <!--TOOLBAR (TOP)-->

    <v-toolbar color="warning" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">BRAG&nbsp;<span class="font-weight-light">biomedical ranking</span></span>
      <seacrbar></seacrbar>
      <v-spacer></v-spacer>
    </v-toolbar>

          <!--MAIN APP CONTENT-->

    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout justify-center align-center>
          <v-flex>
            <span> author : {{ $store.state.author }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import SearchBar from './components/SearchBar.vue'

  export default {
    name: 'App',
    data: () => ({
      drawer: null
    }),

    methods: {
      
    },
    
    components: {
      navbar: NavBar,
      seacrbar: SearchBar
    }
  }
</script>

<style lang="css">
  
</style>