<template>
    <div v-if="$store.state.progress.show" class="text-xs-center">
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
        <div> {{ $store.state.progress.message }}</div>
    </div>
    <div v-else-if="$store.state.searchResultsFound && $store.state.searchDone" class="font-italic"> Displaying results for: 
        <span class="font-weight-bold">{{ $store.state.searchTerm }}</span>
    </div>
    <div v-else-if="!$store.state.searchResultsFound && $store.state.searchDone" class="font-italic"> There are no results found for: 
        <span class="font-weight-bold">{{ $store.state.searchTerm }}</span>
    </div>
</template>

<script>
export default {
    name: 'SearchResult'
}
</script>
