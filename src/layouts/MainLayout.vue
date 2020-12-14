<template>
  <div class="app-main-layout">
  <Navbar />
  <Sidebar />
    <div class="app-main-layout">
      <main class="app-content">
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

  components: {
    Navbar,
    Sidebar
  }
}
</script>
