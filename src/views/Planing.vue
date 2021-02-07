<template>
 <div>
    <div class="page-title">
      <h3>{{ 'PlaningTitle' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{ 'CategoryEntre' | localize }}<router-link to="/categories"></router-link></p>
    <section f-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency}} из {{ category.limit | currency }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo () {
    return {
      title: this.$title('PlaningTitle')
    }
  },
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

      const percent = 100 * spend / key.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = key.limit - spend
      const tooltip = `${ tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed') } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...key,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
