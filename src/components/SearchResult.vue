<template>
    <div v-if="$store.state.searchDone" class="font-italic"> Displaying results for: 
        <span class="font-weight-bold">{{ $store.state.searchTerm }}</span>
    </div>
</template>

<script>
export default {
    name: 'SearchResult'
}
</script>
