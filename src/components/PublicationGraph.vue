<template>
    <div 
    v-if="$store.state.searchResultsFound"
    class="ma-3">
        <span class="title">Publications</span>
    </div>
</template>

<script>
export default {
    name: 'PublicationGraph'
}
</script>