<template>
    <v-card 
    tile
    raised
    v-if="$store.state.searchDone">
        <v-card-title class="title">
            <div>Publications</div>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: 'PublicationGraph'
}
</script>