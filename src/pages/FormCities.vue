<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <p class="text-h6">
          Formulário de {{this.type}} de Cidades
        </p>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-form
            @submit="cadastrar"
            @reset="onReset"
            class="q-gutter-md"
        >
          <q-input
              outlined
              v-model="form.name"
              label="Nome da cidade"
              lazy-rules=""
              :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"/>
          <q-select
              outlined
              v-model="form.stateId"
              :options="states"
              map-options
              emit-value
              option-label="name"
              option-value="_id"
              label="Estados"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"
          />
          <div class="q-gutter-md">
            <q-btn
                icon="navigate_before"
                color="white"
                label="Cancelar"
                class="text-black"
                @click="backTo"
            />
            <q-btn
                icon="save"
                color="primary"
                label="Enviar"
                type="submit"
            />
          </div>
        </q-form>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
export default {
  name: 'formState',
  data () {
    return {
      form: {
        name: '',
        stateId: ''
      },
      states: [],
      type: ''
    }
  },
  mounted () {
    if (this.$route.params._id) {
      this.form.name = this.$route.params.name
      this.type = 'edição'
    } else {
      this.type = 'cadastro'
    }
    console.log(this.$route.params)

    this.getStates()
  },
  methods: {
    async cadastrar () {
      try {
        if (this.$route.params._id) {
          await this.$axios.put(`/cities/${this.$route.params._id}`, {
            ...this.form
          })
          await this.$router.push({ name: 'cities' })
        } else {
          await this.$axios.post('/cities', {
            ...this.form
          })
          await this.$router.push({ name: 'cities' })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getStates () {
      try {
        const response = await this.$axios.get('/states')
        this.states = response.data.DATA
      } catch (e) {
        alert('deu Erro')
      }
    },
    onReset () {

    },
    async backTo () {
      await this.$router.push({ name: 'cities' })
    }
  }
}
</script>
