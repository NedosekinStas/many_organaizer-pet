<template>
  <div>
    <div class="page-title">
      <h3>{{ 'NewRecordTitle' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length">{{ 'CategoryEntre' | localize }}<router-link to="/categories"></router-link></p>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="index in categories"
            :key="index.id"
            :value="index.id"
          > {{ index.title }}
          </option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount" :class="{ active: amount.length }">{{ 'Amount' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >
            {{ 'MinimumValue' | localize }}
          {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{ 'Description' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.minValue"
          >
            {{ 'SelectDescription' | localize }}
          {{ $v.description.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
      <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo () {
    return {
      title: localizeFilter('NewRecordTitle')
    }
  },
  components: { Loader },
  name: 'Record',
  data () {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'outcome',
      amount: 100,
      description: ''
    }
  },
  validations: {
    amount: {
      minValue: minValue(100)
    },
    description: {
      minValue: required
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    /*eslint-disable*/
    this.$nextTick(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    });
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          // Обновляем состояние счета после добавления записи
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          // Обновляем его в БД
          await this.$store.dispatch('updateInfo', { bill })
          this.$message(localizeFilter('RecordСreated'))
          this.$v.$reset()
          this.amount = 100
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`localizeFilter('InsufficientFunds') (${this.amount - this.info.bill})`)
      }
    }
  },
  // Просто для того что бы не было утечек памяти, грубо говоря очищаем висяк
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
