<template>
    <v-card 
    tile
    raised
    v-if="$store.state.searchDone">
        <v-layout row wrap>  
            <v-flex sm8>
                <v-card-title class="title">
                    <div>{{ $store.state.foreName }} {{ $store.state.lastName }}</div>
                </v-card-title>
                <v-card-text>
                    <div class="caption" v-for="aff in $store.state.affiliation" :key="aff"> {{ aff }} </div>
                </v-card-text>
            </v-flex>
            <v-flex>    
                <v-card-text class="subheading font-weight-bold"> H-Index : 
                    <span class="accent--text">{{ $store.getters.hIndex }}</span>
                </v-card-text>
                <v-card-text class="subheading font-weight-bold"> Publications : 
                    <span class="accent--text">{{ $store.getters.publicationCount }}</span>
                </v-card-text>
                <v-card-text class="subheading font-weight-bold"> Citations : 
                    <span class="accent--text">{{ $store.getters.citationCount }}</span>
                </v-card-text>
            </v-flex>
        </v-layout>   
    </v-card>
</template>

<script>
export default {
    name: 'AuthorInfo'
}
</script>

