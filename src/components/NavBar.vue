<template>
    <v-container>
        <v-list dense>
            <v-flex xs6>
            <v-subheader>CITATION</v-subheader>
            </v-flex>
            <v-list-tile v-for="option in citeOptions" :key="option">
            <v-radio-group v-model="cite">
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
        <v-layout justify-center="">
            <v-tooltip right>
            <v-btn 
            fab
            color="primary"
            slot="activator"
            @click="downloading"
            v-if="$store.state.searchResultsFound">
                <v-icon>cloud_download</v-icon>
            </v-btn>
            <span>Download the author's list of publications</span>
            </v-tooltip>
        </v-layout>
    </v-container>
</template>

<script>
import {downloadBiblio} from '../utils'
export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      citeOptions: ['MLA', 'APA', 'Chicago', 'Harvard', 'Vancouver'],
      cite: 'MLA',
      fileFormats: ['txt', 'PDF'],
      fileFormat: 'txt'
    }),
    
    methods: {
      
      downloading: function () {
        this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation as ' + this.fileFormat + '.');
        downloadBiblio(this.$store.state.searchTerm + ".txt", this.$store.state.articles, this.$store.state.hIndex, this.$store.state.citationGraph)
      },

      downloaded: function () {
        this.$store.dispatch('showSuccess', 'Publication list downloaded successfully!');
      },

      downloadFailed: function () {
        this.$store.dispatch('showError', 'Download Failed.');
      }
    }
}
</script>


