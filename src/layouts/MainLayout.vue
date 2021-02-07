<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @clickNav="isOpen = !isOpen" />
      <Sidebar :isOpen="isOpen" />
        <div class="app-main-layout">
          <main class="app-content" :class="{full: !isOpen}">
          <div class="app-page">
            <router-view />
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large red" to="/record" v-tooltip="'Создать новую запись'">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/common/messages'

export default {
  name: 'Mainlayout',
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  // Ждем инфу (Если есть то диспачим в компонент)
  async mounted () {
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }
    // Если есть данные то сделаем false и не будет асинхронной операции
    this.loading = false
  },
  computed: {
    error () {
      // Если что то будет менять в геттерах тогда будет обновляться данное свойство
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
