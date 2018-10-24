<template>
    <div 
    v-if="$store.state.searchDone"
    class="ma-3">
        <span class="title">Publications</span>
    </div>
</template>

<script>
export default {
    name: 'PublicationGraph'
}
</script>