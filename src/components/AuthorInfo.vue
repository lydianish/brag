<template>
    <v-card 
    tile
    raised
    v-if="$store.state.searchDone">
        <v-layout column>  
            <v-flex>
                <v-card-title class="title">
                    <div class="accent--text">{{ $store.state.foreName }} {{ $store.state.lastName }}</div>
                </v-card-title>
            </v-flex>
            <v-flex>
                <v-layout row wrap>
                    <v-flex>
                        <v-card-text class="subheading font-weight-bold"> H-Index : 
                            <span class="accent--text">{{ $store.getters.hIndex }}</span>
                        </v-card-text>
                    </v-flex>
                    <v-flex>
                        <v-card-text class="subheading font-weight-bold"> Publications : 
                            <span class="accent--text">{{ $store.getters.publicationCount }}</span>
                        </v-card-text>
                    </v-flex>
                    <v-flex>
                        <v-card-text class="subheading font-weight-bold"> Citations : 
                            <span class="accent--text">{{ $store.getters.citationCount }}</span>
                        </v-card-text>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>   
    </v-card>
</template>

<script>
export default {
    name: 'AuthorInfo'
}
</script>

