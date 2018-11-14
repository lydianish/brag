<template>
    <div 
    v-if="$store.state.searchResultsFound"
    class="ma-3">
        <span class="title">Citations</span>
        <graph :data="$store.state.citationGraph"/>
    </div>
</template>

<script>
import Graph from '../components/Graph.vue'

export default {
    name: 'CitationGraph',
    components: {
        graph: Graph
    }
}
</script>