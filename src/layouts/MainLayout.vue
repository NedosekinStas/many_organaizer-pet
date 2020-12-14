<template>
  <div class="app-main-layout">
  <Navbar @clickNav="isOpen = !isOpen" />
  <Sidebar :isOpen="isOpen" />
    <div class="app-main-layout">
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'Mainlayout',
  data: () => ({
    isOpen: true
  }),

  components: {
    Navbar,
    Sidebar
  }
}
</script>
