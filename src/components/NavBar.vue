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
import {downloadBiblio} from '../utils'
import {downloadBiblioBib} from '../utils'
import {downloadBiblioMLA} from '../utils'
export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      citeOptions: ['MLA', 'APA', 'Vancouver','BibTex'],
      cite: 'MLA'
    }),
    
    methods: {
      
      downloading: function () {
        
        switch (this.cite) {
           case 'Vancouver':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblio(this.$store.state.searchTerm + ".txt", this.$store.state.articles, this.$store.state.hIndex, this.$store.getters.citationCount)
               break;
               
          case 'BibTex':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblioBib(this.$store.state.searchTerm + ".txt", this.$store.state.articles, this.$store.state.hIndex, this.$store.getters.citationCount,this.$store.getters.name)
               
           
               break;
               
        case 'MLA':
               this.$store.dispatch('showInfo', 'Downloading publications in ' + this.cite + ' citation' + '.');
               downloadBiblioMLA(this.$store.state.searchTerm + ".txt", this.$store.state.articles, this.$store.state.hIndex, this.$store.getters.citationCount)
               break;
          
          
          
        
          default:
    console.log('error of format');}
        
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


