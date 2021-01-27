<template>
  <div class="col s12 m6">
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option
            v-for="index of categories"
            :key="index.id"
            :value="index.id"
          >
            {{ index.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
        >
        <label for="name">Название</label>
        <span
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название категории
        </span>
      </div>

      <div class="input-field">
        <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
        >
        <label for="limit">Лимит</label>
        <span
          class="helper-text invalid"
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
          Минимальное значение {{ $v.limit.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
      <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      select: null,
      current: null,
      title: '',
      limit: ''
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(100)
    }
  },
  mounted () {
    /*eslint-disable*/
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  // Динамически следим за моделью
  watch: {
    current (categoryId) {
      const { title, limit } = this.categories.find(key => key.id === categoryId)
      this.title = title,
      this.limit = limit
    }
  },
  // life cycle hook created, вызывается практически первый при инициализации компонента
  created () {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>
