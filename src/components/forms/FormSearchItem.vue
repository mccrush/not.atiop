<template>
  <div class="input-group input-group-sm mt-2">
    <input
      type="text"
      class="form-control"
      aria-describedby="searchItem"
      name="searchItem"
      placeholder="Поиск"
      v-model="searchFilter"
      @keyup="$emit('update-search', searchFilter)"
    />
    <BtnBackspace @click="clearSearch" />
  </div>
</template>

<script>
import BtnBackspace from './../buttons/BtnBackspace.vue'

export default {
  components: {
    BtnBackspace
  },
  emits: ['update-search'],
  data() {
    return {
      searchFilter: ''
    }
  },
  methods: {
    clearSearch() {
      this.searchFilter = ''
      this.$emit('update-search', this.searchFilter)
    }
  }
}
</script>