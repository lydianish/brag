<template>
    <v-text-field
        solo
        flat
        hide-details
        placeholder="search author..."
        append-outer-icon="search"
        v-model="searchBar"
        ref="searchBar"
        @click:append-outer="searchAuthor"
      ></v-text-field>
</template>

<script>
export default {
    name: 'SearchBar',
    data: () => ({
        searchBar: ''
    }),

    methods: {
        searchAuthor: function () {
        if (this.searchBar) {
          this.$store.commit('setAuthor', this.searchBar)
          this.$refs.searchBar.reset()
          //search author ...
        }
      }
    }
}
</script>
