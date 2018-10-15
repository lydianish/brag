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
        <v-tooltip bottom>
            <v-btn 
            fab
            color="warning"
            slot="activator"
            @click="download">
            <v-icon>cloud_download</v-icon>
        </v-btn>
        <span>Download the author's list of publications</span>
        </v-tooltip>
    </v-container>
</template>

<script>
export default {
    name: 'NavBar',
    data: () => ({
      drawer: null,
      sortByOptions: ['alphabetical', 'chronological', 'reverse chronological'],
      sortBy: '',
      fileFormats: ['txt', 'PDF'],
      fileFormat: ''
    }),
    
    methods: {
      download: function () {
        alert('downloading ' + this.sortBy + ' ' + this.fileFormat)
      }
    }
}
</script>


