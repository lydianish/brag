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
        :headers="headers"
        :items="$store.state.articles"
        :search="search"
        >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.journal.year }}</td>
            <td class="text-xs-right">{{ props.item.citationCount }}</td>
            <td class="text-xs-right">{{ props.item.journal.title }}</td>
            <td class="text-xs-right">{{ props.item.journal.impactFactor }}</td>
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
          { text: 'Title', value: 'title' },
          { text: 'Year', value: 'journal.year' },
          { text: 'Cited By', value: 'citationCount' },
          { text: 'Journal', value: 'journal.title' },
          { text: 'IF', value: 'journal.impactFactor' },
        ]
    })
}
</script>