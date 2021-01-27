import firebase from 'firebase'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // Object.keys проходимся по объекту, методом map трасфармируем массив (categories) в новый массив и сформировываем новый объект
        // и оператором спрет обращаемся к categories к ключу key где поля title и limit
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        // uid делается для того что бы записать ктегорию к этому пользователю, который работает с системой
        const uid = await dispatch('getUid')
        // firebase вернет определенную категорию
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        // key динамически сгенерируется, по id будем искать определнные категории
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        // ОБращаемся к категории по id (child) обновляем (update) title и limit в качестве объекта
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
