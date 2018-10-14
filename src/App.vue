<template>
  <v-app id="brag">

          <!--NAVIGATION BAR (LEFT)-->

    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >
      <v-list dense class="grey lighten-4">
        <v-flex xs6>
          <v-subheader>Sort By</v-subheader>
        </v-flex>
        <v-list-tile v-for="(option, i) in sortByOptions" :key="i">
          <v-radio-group v-model="sortBy">
            <v-radio :label="option" :value="option" color=grey ></v-radio>
          </v-radio-group>
        </v-list-tile>
        <v-divider dark class="my-3"></v-divider>
        <v-flex xs6>
          <v-subheader>File Format</v-subheader>
        </v-flex>
        <v-list-tile v-for="(format, i) in fileFormats" :key="i">
          <v-radio-group v-model="fileFormat">
            <v-radio :label="format" :value="format" color=grey ></v-radio>
          </v-radio-group>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

          <!--TOOLBAR (TOP)-->

    <v-toolbar color="amber" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">BRAG&nbsp;<span class="font-weight-light">biomedical ranking</span></span>
      <v-text-field
        inverted
        flat
        hide-details
        clearable
        label="search author..."
        prepend-inner-icon="search"
        v-on:keyup.enter="search"
        v-model="author"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>

          <!--MAIN APP CONTENT-->

    <v-content>
      <v-container fluid fill-height class="white">
        <v-layout justify-center align-center>
          <v-flex>
            <span>{{ searchAuthor }}</span>
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
      author: '',
      sortByOptions: ['alphabetical', 'chronological', 'reverse chronological'],
      sortBy: '',
      fileFormats: ['txt', 'PDF'],
      fileFormat: '',
      searchAuthor: false
    }),
    methods: {
      search: function () {
        searchAuthor = true;
        alert('Hello ')
      }
    },
    props: {
      source: String
    }
  }
</script>

<style lang="css">
  
</style>