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
        :key="tag.id"
        class="cursor-pointer list-group-item p-0"
      >
        <div class="d-flex justify-content-between">
          <div class="w-100 ps-2" @click="$emit('toggle-tag', tag.title)">
            {{ tag.title }}
          </div>
          <button
            class="btn btn-sm btn-light p-0 ps-2 pe-2"
            @click="removeTag(tag)"
          >
            x
          </button>
        </div>
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
        item.title.toUpperCase().includes(this.searchTag.toUpperCase())
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
    },
    removeTag(tag) {
      this.$store.dispatch('removeTag', {
        item: tag,
        currentUserId: this.currentUserId
      })
    }
  }
}
</script>