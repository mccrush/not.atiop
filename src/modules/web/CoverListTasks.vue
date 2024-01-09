<template>
  <div>
    <FormAddItem type="task" :parentId="projectId" @set-item-id="setItemId" />
    <ListItems
      ref="listItems"
      title="Заметки"
      :parentId="projectId"
      type="task"
    />
  </div>
</template>

<script>
import FormAddItem from './../../components/forms/FormAddItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormAddItem,
    ListItems
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    }
  },
  methods: {
    setItemId(item) {
      this.$refs.listItems.setItemId(item)
    }
  }
}
</script>