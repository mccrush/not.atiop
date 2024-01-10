<template>
  <div class="border mt-2 p-1">
    <input
      class="form-control"
      type="text"
      id="searchTag"
      v-model="searchTag"
    />
    <ul class="list-group">
      <li
        v-for="tag in filterTags"
        :key="tag"
        class="list-group-item"
        @click="$emit('toggle-tag', tag)"
      >
        {{ tag }}
      </li>
    </ul>
    <button class="btn btn-sm text-secondary mt-2">Add new tag</button>
  </div>
</template>

<script>
export default {
  emits: ['toggle-tag'],
  data() {
    return {
      searchTag: ''
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    },
    filterTags() {
      return this.tags.filter(item =>
        item.toUpperCase().includes(this.searchTag.toUpperCase())
      )
    }
  }
}
</script>