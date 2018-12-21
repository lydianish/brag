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
import {downloadBiblioMLA, downloadBiblioVCV, downloadBiblioBib} from '../utils'
export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      citeOptions: ['MLA', 'Vancouver','BibTex'],
      cite: 'MLA'
    }),
    
    methods: {
      
      downloading: function () {
        const filename = this.$store.state.searchTerm + '_' + this.cite + ".txt";
        const articles = this.$store.getters.sorted;
        const refcode = this.$store.state.searchTerm.replace(/\s+/g,'');
        switch (this.cite) {
           case 'MLA':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblioMLA(filename, articles, this.$store.state.hIndex, this.$store.state.citationCount);
               break;
           
           case 'Vancouver':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblioVCV(filename, articles, this.$store.state.hIndex, this.$store.state.citationCount);
               break;
               
          case 'BibTex':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblioBib(filename, articles, refcode);
               break;

          default:
            this.$store.dispatch('showError', 'Undefined format.'); 
        }
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


