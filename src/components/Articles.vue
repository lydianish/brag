<template>
    <v-card
    flat
    v-if="$store.state.searchResultsFound">
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
        :pagination.sync="pagination"
        v-on:update:pagination="sortBy"
        >
        <template slot="headerCell" slot-scope="props">
            <v-tooltip top>
                <span slot="activator">
                {{ props.header.text }}
                </span>
                <span v-if="props.header.text==='IF'">
                Impact Factor ({{ impactFactorSource }})
                </span>
                <span v-else>
                {{ props.header.text }}
                </span>
            </v-tooltip>
        </template>
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
import { IMPACT_FACTOR_SOURCE } from '../utils'
export default {
    name: 'Articles',
    data: () => ({
        search: '',
        headers: [
          { text: 'Title', value: 'title'},
          { text: 'Authors', value: 'authors[0].lastName'},
          { text: 'Journal', value: 'journal.title' },
          { text: 'IF', value: 'journal.impactFactor' },
          { text: 'Year', value: 'journal.year' },
          { text: 'Cited By', value: 'citationCount' }
        ],
        pagination: {descending: true, rowsPerPage: 10, sortBy: 'Year'},
        impactFactorSource: IMPACT_FACTOR_SOURCE
    }),
    methods: {
        sortBy: function (event) {
            console.log(event.sortBy + ' ' + event.descending)
        }
    }
}
</script>