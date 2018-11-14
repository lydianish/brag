<template>
    <div 
    v-if="$store.state.searchResultsFound"
    class="ma-3">
        <span class="title">Publications</span>
        <graph :data="$store.getters.publicationGraph"/>
    </div>
</template>

<script>
import Graph from '../components/Graph.vue'

export default {
    name: 'PublicationGraph',
    components: {
        graph: Graph
    }
}
</script>