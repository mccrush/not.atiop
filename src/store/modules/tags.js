import fireApp from './../../firebase'
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

export default {
  state: {
    tags: []
  },

  mutations: {
    setItems(state, { type, items }) {
      state[type] = items
    },
  },

  actions: {
    async addITag({ commit }, { item, currentUserId }) {

    },

    async getTags({ commit }, { type, currentUserId }) {
      let tempArray = []
      const q = query(collection(db, currentUserId + '/' + type))
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