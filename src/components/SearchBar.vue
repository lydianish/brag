<template>
    <v-text-field
        solo
        flat
        hide-details
        color="black"
        placeholder="search author..."
        append-outer-icon="search"
        v-model="searchTerm"
        ref="searchBar"
        @keydown="searchAuthor"
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
        searchAuthor: function (event) {
        if (this.searchTerm &&
            ((event instanceof MouseEvent) ||
                (event instanceof KeyboardEvent && event.code === 'Enter'))
            ) {
          this.$store.dispatch('searchAuthor', this.searchTerm);
          this.$refs.searchBar.reset()
        }
      }
    }
}
</script>
