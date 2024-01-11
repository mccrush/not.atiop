<template>
  <div>
    <div class="row">
      <div class="col-10 col-md-10 pe-0">
        <input
          type="text"
          class="form-control bg-white"
          name="itemTitle"
          v-model.trim="item.title"
          @blur="saveItem"
        />
      </div>
      <div class="col-2 col-md-2">
        <div class="d-flex justify-content-end pt-1">
          <BtnTrash class="btn-sm" @click="removeItem(item)" />
        </div>
      </div>
    </div>

    <!-- <textarea
      class="form-control bg-white mt-3"
      rows="6"
      name="itemDescription"
      v-model="item.description"
      @blur="saveItem"
    ></textarea> -->
    <div class="mt-3">
      <Editor
        :api-key="apiKey"
        :initialValue="item.description"
        :init="conf"
        v-model="item.description"
        @blur="saveItem"
      />
    </div>

    <!-- <div class="row">
      <div class="col-6 col-md-3 pe-0">
        <input
          type="number"
          class="form-control bg-white mt-3"
          name="itemPosition"
          v-model.number="item.position"
          @blur="saveItem"
        />
      </div>

      <div class="col-6 col-md-9">
        <div class="d-flex justify-content-end mt-3">
          <BtnTrash class="btn-sm" @click="removeItem(item)" />
        </div>
      </div>
    </div> -->
    <div class="d-flex mt-2 p-1">
      <div class="dropdown">
        <button
          class="btn btn-sm btn-light text-muted me-2 p-0 ps-2 pe-2"
          data-bs-toggle="dropdown"
        >
          +
        </button>
        <FormAddTag class="dropdown-menu" @toggle-tag="toggleTag" />
      </div>

      <div class="d-flex align-items-center">
        <button
          v-for="tag in item.tags"
          :key="tag"
          class="btn btn-sm btn-light text-muted me-2 p-0 ps-2 pe-2"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import BtnTrash from './../buttons/BtnTrash.vue'
import FormAddTag from './FormAddTag.vue'

export default {
  components: {
    Editor,
    BtnTrash,
    FormAddTag
  },
  props: {
    item: Object
  },
  data() {
    return {
      apiKey: 'hanxollva4phpflvvnv1lje4y82fvprrkqrmpqeclw066js2',
      conf: {
        menubar: false,
        plugins: 'lists link table code wordcount',
        toolbar:
          'bold forecolor link numlist bullist alignleft aligncenter table code removeformat'
      }
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    }
  },
  methods: {
    toggleTag(tag) {
      console.log('1 tag = ', tag)
      if (!this.item.tags) {
        this.item.tags = []
        // Не знаю, как пока избавится от этой необходимости
      }

      if (this.item.tags.find(item => item === tag)) {
        this.item.tags = this.item.tags.filter(item => item !== tag)
      } else {
        this.item.tags.push(tag)
      }
      this.saveItem()
    },
    saveItem() {
      this.$store.dispatch('updateItemRT', {
        item: this.item,
        currentUserId: this.currentUserId
      })
    },

    removeOneItem(item) {
      this.$store.dispatch('removeItemRT', {
        item,
        currentUserId: this.currentUserId
      })

      this.$store.commit('setItem', { type: this.item.type, item: null })
      this.$store.commit('setItemId', { type: this.item.type, id: '' })
    },

    removeItem(item) {
      if (item.type === 'direction') {
        if (confirm('Будут удалены все дочерние Проекты и Задачи')) {
          const childrenTasks = this.$store.getters.project.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else if (item.type === 'project') {
        if (confirm('Будут удалены все дочерние Задачи')) {
          const childrenTasks = this.$store.getters.task.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else {
        if (confirm('Точно удалить?')) {
          this.removeOneItem(item)
        }
      }
    }
  }
}
</script>