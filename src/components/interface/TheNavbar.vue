<template>
  <nav class="navbar navbar-expand-md border-bottom">
    <div class="container-fluid pt-1">
      <!-- <div class="d-sm-none navbar-brand p-0">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-0"
          alt="ATIOP Заметки"
        />
      </div> -->
      <div class="navbar-brand p-0">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-2"
          alt="ATIOP Заметки"
        />
        ATIOP Заметки
      </div>

      <!-- <div
        v-if="currentUserId"
        class="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'all' }"
          title="Все"
          @click="setView('all')"
        />
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'date' }"
          title="Сегодня"
          @click="setView('date')"
        />
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'coming' }"
          title="Скоро"
          @click="setView('coming')"
        />
      </div> -->
      <div class="me-auto"></div>
      <!-- <a
        href="https://doc.atiop.ru/"
        target="_blank"
        class="btn btn-sm btn-light text-secondary d-none d-sm-block ps-2 pe-2 me-2"
        title="Руководство"
        >Руководство ⇗</a
      > -->
      <span class="d-none d-sm-block text-secondary small me-2">{{
        currentUserEmail
      }}</span>

      <BtnLogOut
        v-if="currentUserId"
        class="btn-sm d-none d-sm-block ps-3 pe-3"
        @click="logOut"
      />

      <button
        class="d-sm-none btn btn-sm btn-light p-1 ps-3 pe-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        =
      </button>
    </div>
    <!-- </div> -->
  </nav>
</template>

<script>
//import BtnSelectView from './../buttons/BtnSelectView.vue'
import BtnLogOut from './../buttons/BtnLogOut.vue'

export default {
  components: {
    BtnLogOut
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    currentUserEmail() {
      return this.$store.getters.currentUserEmail
    },
    view() {
      return this.$store.getters.view
    }
  },
  methods: {
    setView(view) {
      this.$store.commit('setView', view)
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItem', { type: 'task', item: null })
    },
    logOut() {
      this.$store.commit('setItem', { type: 'task', item: null })
      this.$store.dispatch('logOut')
    }
  }
}
</script>