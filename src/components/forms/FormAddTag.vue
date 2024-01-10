<template>
  <div class="border-0 p-2">
    <input
      class="form-control form-control-sm"
      type="text"
      id="searchTag"
      v-model="searchTag"
    />
    <ul class="list-group mt-1">
      <li
        v-for="tag in filterTags"
        :key="tag"
        class="cursor-pointer list-group-item p-0 ps-2"
        @click="$emit('toggle-tag', tag)"
      >
        {{ tag }}
      </li>
    </ul>
    <button
      v-if="searchTag"
      class="btn btn-sm btn-light text-secondary w-100 mt-1"
      @click="createTag"
    >
      Создать тег
    </button>
  </div>
</template>

<script>
import { modelsFactory } from './../../helpers/modelsFactory'

export default {
  emits: ['toggle-tag'],
  data() {
    return {
      searchTag: ''
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    tags() {
      return this.$store.getters.tags
    },
    filterTags() {
      return this.tags.filter(item =>
        item.toUpperCase().includes(this.searchTag.toUpperCase())
      )
    }
  },
  methods: {
    createTag() {
      if (this.searchTag) {
        let item = modelsFactory({ type: 'tags' })
        item.title = this.searchTag
        this.$store.dispatch('addITag', {
          item,
          currentUserId: this.currentUserId
        })
        this.searchTag = ''
        // И далее тег должен автоматически закрепиться за заметкой
      }
    }
  }
}
</script>