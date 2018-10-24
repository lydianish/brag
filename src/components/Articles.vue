<template>
    <v-card
    flat
    v-if="$store.state.searchDone">
        <v-card-title class="title">
        Articles
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-card-title>
        <v-data-table
        must-sort
        :headers="headers"
        :items="$store.state.articles"
        :search="search"
        v-on:update:pagination="sortBy"
        >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td>
                {{ props.item.authors[0].lastName }},
                {{ props.item.authors[0].foreName }},
                <span class="font-italic"> et al.</span>
            </td>
            <td>{{ props.item.journal.title }}</td>
            <td class="text-xs-right">{{ props.item.journal.impactFactor }}</td>
            <td class="text-xs-right">{{ props.item.journal.year }}</td>
            <td class="text-xs-right">{{ props.item.citationCount }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="accent" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'Articles',
    data: () => ({
        search: '',
        headers: [
          { text: 'Title', value: 'title'},
          { text: 'Author', value: 'authors[0].lastName'},
          { text: 'Journal', value: 'journal.title' },
          { text: 'IF', value: 'journal.impactFactor' },
          { text: 'Year', value: 'journal.year' },
          { text: 'Cited By', value: 'citationCount' }
        ]
    }),
    methods: {
        sortBy: function (event) {
            console.log(event.sortBy + ' ' + event.descending)
        }
    }
}
</script>