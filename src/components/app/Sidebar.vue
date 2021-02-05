<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-red pointer">{{ link.title | localize }}</a>
    </router-link>
  </ul>
</template>

<script>

export default {
  name: 'Sidebar',
  props: ['isOpen'],
  data () {
    return {
      links: [
        { title: 'Menu_Bill', url: '/', exact: true },
        { title: 'Menu_History', url: '/history' },
        { title: 'Menu_Planing', url: '/planing' },
        { title: 'Menu_Record', url: '/record' },
        { title: 'Menu_Cetegory', url: '/categories' }
      ]
    }
  }
}
</script>
