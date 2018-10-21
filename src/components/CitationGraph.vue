<template>
    <v-card 
    tile
    raised
    v-if="$store.state.searchDone">
        <v-card-title class="title">
            <div>Citations</div>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: 'CitationGraph'
}
</script>