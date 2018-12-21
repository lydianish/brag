<template>
    <v-container fluid>
        <v-layout column align-center justify-center fill-height>
            <v-img
            width="350px"
            :src="require('../assets/logo-full.png')"
            >
            </v-img>
            <v-flex class="pt-5">
                <span class="display-1 font-weight-thin primary--text">Features:</span>
            </v-flex>
            <v-flex class="pb-1 pt-3">
                <v-icon color="grey">library_books</v-icon>
                <span class="title font-weight-thin">Bibliography of an author in the biomedical field from PubMed and Google Scholar</span>
            </v-flex>
            <v-flex class="pb-1">
                <v-icon medium color="grey">star</v-icon>
                <span class="title font-weight-thin">H-Index and total citation count of the author</span>
            </v-flex>
            <v-flex class="pb-1">
                <v-icon medium color="grey">list</v-icon>
                <span class="title font-weight-thin">Journal Impact Factors </span>
            </v-flex>
            <v-flex class="pb-1">
                <v-icon medium color="grey">insert_chart</v-icon>
                <span class="title font-weight-thin">Charts of publications and citations per year </span>
            </v-flex>
            <v-flex class="pb-1">
                <v-icon medium color="grey">sort_by_alpha</v-icon>
                <span class="title font-weight-thin">Sorting of articles by title, first author, journal, impact factor, year or citations </span>
            </v-flex>
            <v-flex class="pb-1">
                <v-icon medium color="grey">file_download</v-icon>
                <span class="title font-weight-thin">Download in MLA, Vancouver and BibTex citation format</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Welcome'
}
</script>
