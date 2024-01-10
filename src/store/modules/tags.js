import fireApp from './../../firebase'
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    tags: []
  },

  mutations: {
    addItem(state, { item }) {
      state[item.type].push(item)
    },
    setItems(state, { type, items }) {
      state[type] = items
    },
  },

  actions: {
    async addITag({ commit, dispatch }, { item, currentUserId }) {
      try {
        //commit('addItem', { item })
        await setDoc(doc(db, 'users/' + currentUserId + '/' + item.type, item.id), item)
        dispatch('getTags', { type: item.type, currentUserId })
        //console.log('admin.js: addITag(): Данные добавлены')
      } catch (error) {
        console.error('admin.js: addITag(): error', error)
      }
    },

    async getTags({ commit }, { type, currentUserId }) {
      let tempArray = []
      const q = query(collection(db, 'users/' + currentUserId + '/' + type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      commit('setItems', { type, items: tempArray })
    },
  },

  getters: {
    tags: state => state.tags
  }
}