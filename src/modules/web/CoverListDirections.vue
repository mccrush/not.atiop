<template>
  <div>
    <!-- <FormSearchItem @update-search="updateSearch" /> -->
    <FormAddItem type="direction" />

    <ListItems
      v-for="direction in directionsSort"
      :key="direction.id"
      :directionItem="direction"
      :title="direction.title"
      :parentId="direction.id"
      type="project"
    />
  </div>
</template>

<script>
import { sortMethod } from './../../helpers/sortMethod'

import FormSearchItem from './../../components/forms/FormSearchItem.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormSearchItem,
    FormAddItem,
    ListItems
  },
  data() {
    return {
      searchFilter: ''
    }
  },
  computed: {
    directions() {
      return this.$store.getters.direction
    },
    directionsSort() {
      return sortMethod(this.directions, 'asc', 'position')
    }
  },
  methods: {
    updateSearch(newVal) {
      this.searchFilter = newVal
    }
  }
}
</script>