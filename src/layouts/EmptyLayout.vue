<template>
  <div class="empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '@/common/messages'
export default {
  name: 'Emptylayout',
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
