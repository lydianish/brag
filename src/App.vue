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
      <v-list dense>
        <v-flex xs6>
          <v-subheader>SORT BY</v-subheader>
        </v-flex>
        <v-list-tile v-for="option in sortByOptions" :key="option">
          <v-radio-group v-model="sortBy">
            <v-radio :label="option" :value="option" color=light ></v-radio>
          </v-radio-group>
        </v-list-tile>
        <v-divider dark class="my-3"></v-divider>
        <v-flex xs6>
          <v-subheader>FILE FORMAT</v-subheader>
        </v-flex>
        <v-list-tile v-for="format in fileFormats" :key="format">
          <v-radio-group v-model="fileFormat">
            <v-radio :label="format" :value="format" color=light ></v-radio>
          </v-radio-group>
        </v-list-tile>
      </v-list>
      <v-divider dark class="my-3"></v-divider>
      <v-tooltip bottom>
        <v-btn 
        fab
        color="warning"
        slot="activator">
        <v-icon>cloud_download</v-icon>
      </v-btn>
      <span>Download the author's list of publications</span>
      </v-tooltip>
      

    </v-navigation-drawer>

          <!--TOOLBAR (TOP)-->

    <v-toolbar color="warning" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">BRAG&nbsp;<span class="font-weight-light">biomedical ranking</span></span>
      <v-text-field
        solo
        flat
        hide-details
        placeholder="search author..."
        append-outer-icon="search"
        v-model="searchBar"
        ref="searchBar"
        @click:append-outer="searchAuthor"
      ></v-text-field>
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
  export default {
    data: () => ({
      drawer: null,
      searchBar: '',
      sortByOptions: ['alphabetical', 'chronological', 'reverse chronological'],
      sortBy: '',
      fileFormats: ['txt', 'PDF'],
      fileFormat: ''
    }),
    methods: {
      searchAuthor: function () {
        if (this.searchBar) {
          this.$store.commit('setAuthor', this.searchBar)
          this.$refs.searchBar.reset()
          //search author ...
        }
      }
    },
    props: {
      source: String
    }
  }
</script>

<style lang="css">
  
</style>