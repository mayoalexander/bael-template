<template>
  <v-card>
    <v-card-title>
      Branches
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getBranches"
      :search="search"
      :rows-per-page-items="All"
      item-key="name"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.state }}</td>
          <td>{{ props.item.region }}</td>
          <td class="text-xs-right">
            <v-icon
              v-if="!props.expanded"
              class="expand-arrow"
            >
              expand_more
            </v-icon>
            <v-icon
              v-else
              class="expand-arrow"
            >
              expand_less
            </v-icon>
          </td>
        </tr>
      </template>
      <template
        slot="expand"
        slot-scope="props"
      >
        <v-card flat>
          <v-card-text>
            <v-layout
              row
              wrap
              justify-start
            >
              <v-flex
                xs12
                class="text-xs-left subheading"
              >
                <router-link
                  :to="'/branch/' + props.item.slug"
                >
                  <i class="fas fa-info-circle fa-lg" />&nbsp;&nbsp;
                  Focus on this Branch
                </router-link>
              </v-flex>
              <br><br>
              <v-flex
                xs12
                sm6
                class="branch-grid-info-left"
              >
                <v-layout
                  row
                  wrap
                  justify-space-between
                >
                  <v-flex
                    xs12
                    class="text-xs-left caption"
                  >
                    <i class="fas fa-phone fa-rotate-90" />&nbsp;&nbsp;{{ props.item.phone_number }}
                  </v-flex>
                  <v-flex
                    v-if="props.item.fax_number"
                    class="text-xs-left caption"
                    xs12
                  >
                    <i class="fas fa-print" />&nbsp;&nbsp;{{ props.item.fax_number }}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text-xs-left caption"
                  >
                    <i class="fas fa-map-marker-alt" />
                    &nbsp;&nbsp;{{ props.item.street }} <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ props.item.city }},
                    {{ props.item.state }}
                    {{ props.item.zip_code }}
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                xs12
                sm6
                class="branch-grid-info-right"
              >
                <v-layout
                  row
                  wrap
                  justify-space-between
                >
                  <v-flex
                    xs12
                    class="text-xs-left caption"
                  >
                    <i class="fas fa-envelope" />&nbsp;&nbsp;{{ props.item.email }}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text-xs-left caption"
                  >
                    <i class="far fa-credit-card" />&nbsp;&nbsp;{{ props.item.email_AR }}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text-xs-left caption"
                  >
                    <i class="far fa-money-bill-alt" />&nbsp;&nbsp;{{ props.item.email_AP }}
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BranchGrid',
  data () {
    return {
      search: '',
      All: [{ text: 'All', value: -1 }],
      headers: [
        {
          text: 'State',
          align: 'left',
          sortable: true,
          value: 'state'
        },
        {
          text: 'City',
          align: 'left',
          value: 'city'
        },
        {
          text: '',
          align: 'left',
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getMapBranch',
      'getBranches'
    ])
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .expand-arrow{
    cursor: pointer;
  }
</style>
