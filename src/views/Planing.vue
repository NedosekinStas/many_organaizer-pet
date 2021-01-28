<template>
 <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>
    <Loader v-if="true" />
    <p v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories"></router-link></p>
    <section f-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend }} из {{ category.limit }}
        </p>
        <div class="progress" >
          <div
            class="determinate"
            :class="[category.progressColor]"
            style="{ width: category.processPercent }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Planin',
  data () {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    /*eslint-disable*/
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(key => {
      const spend = records
      .filter(i => i.categoryId === key.id)
      .filter(i => i.type === 'outcome')
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)

      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      return {
        ...key,
        progressPercent,
        progressColor,
        spend
      }
    })

    this.loading = false
  }
}
</script>
