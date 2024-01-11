<template>
  <div>
    <FormAddItem
      type="task"
      :parentId="projectId"
      :searchFilter="searchFilter"
      @set-item-id="setItemId"
    />
    <FormSearchItem @update-search="updateSearch" />
    <ListItems
      ref="listItems"
      title="Заметки"
      :parentId="projectId"
      :searchFilter="searchFilter"
      type="task"
    />
  </div>
</template>

<script>
import FormAddItem from './../../components/forms/FormAddItem.vue'
import FormSearchItem from './../../components/forms/FormSearchItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormAddItem,
    FormSearchItem,
    ListItems
  },
  data() {
    return {
      searchFilter: ''
    }
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    }
  },
  methods: {
    updateSearch(newVal) {
      this.searchFilter = newVal
    },
    setItemId(item) {
      this.$refs.listItems.setItemId(item)
    }
  }
}
</script>