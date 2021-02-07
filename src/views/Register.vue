<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <div class="input-field">
        <input
          id="email"
          type="text"
          @focus="$v.email.$reset()"
          v-model.trim="$v.email.$model"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.required)"
          >
            {{ 'NotBeEmpty' | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="($v.email.$dirty && !$v.email.email)"
          >
            {{ 'EnterValidEmail' | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          @focus="$v.password.$reset()"
          v-model.trim="$v.password.$model"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.required)"
        >
          {{ 'EnterPassword' | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >
          {{ 'PasswordMustBe' | localize }} {{$v.password.$params.minLength.min}} {{ 'CharactersNowHe' | localize }} {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="$v.name.$model"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
          {{ 'EnterName' }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="$v.agree.$model"/>
            <span>{{ 'AgreeRules' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
      {{ 'AlreadyAccount' | localize }}
      <router-link to="/login">{{ 'SignIn' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  metaInfo () {
    return {
      title: this.$title('RegistrationTitle')
    }
  },
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {
      email, required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required
    },
    agree: {
      checked: v => v
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
