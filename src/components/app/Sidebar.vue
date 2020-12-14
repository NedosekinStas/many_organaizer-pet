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
      <a href="#" class="waves-effect waves-red pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['isOpen'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planing' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>
