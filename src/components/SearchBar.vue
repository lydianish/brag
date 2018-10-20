<template>
    <v-text-field
        solo
        flat
        hide-details
        placeholder="search author..."
        append-outer-icon="search"
        v-model="searchTerm"
        ref="searchBar"
        @click:append-outer="searchAuthor"
      ></v-text-field>
</template>

<script>
export default {
    name: 'SearchBar',
    data: () => ({
        searchTerm: ''
    }),

    methods: {
        searchAuthor: function () {
        if (this.searchTerm) {
          this.$store.dispatch('searchAuthor', this.searchTerm);
          this.$refs.searchBar.reset()
        }
      }
    }
}
</script>
