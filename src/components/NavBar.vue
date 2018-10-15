<template>
    <v-container>
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
        <v-tooltip right>
            <v-btn 
            fab
            color="warning"
            slot="activator"
            @click="download">
            <v-icon>cloud_download</v-icon>
        </v-btn>
        <span>Download the author's list of publications</span>
        </v-tooltip>
        <v-snackbar
        v-model="downloading"
        color="info"
        :timeout="timeout"
        bottom
        >
        Downloading publication list in {{ sortBy }} order as {{ fileFormat }}.
        </v-snackbar>
        <v-snackbar
        v-model="downloaded"
        color="success"
        :timeout="timeout"
        bottom
        >
        Publication list downloaded successfully.
        </v-snackbar>
        <v-snackbar
        v-model="downloadFailed"
        color="error"
        :timeout="timeout"
        bottom
        >
        Download Failed.
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      sortByOptions: ['alphabetical', 'chronological', 'reverse chronological'],
      sortBy: 'alphabetical',
      fileFormats: ['txt', 'PDF'],
      fileFormat: 'txt',
      downloading: false,
      downloaded: false,
      downloadFailed: false,
      timeout: 3000 
      
    }),
    
    methods: {
      download: function () {
        this.downloading = true
      }
    }
}
</script>


