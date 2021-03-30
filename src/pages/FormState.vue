<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <p class="text-h6">
          Formulário de {{this.name}} de Estados
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
              label="Nome do estado"
              lazy-rules=""
              :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"/>
          <q-input
              outlined
              v-model="form.uf"
              label="Sigla do Estado"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatorio']"
              maxlength="2"/>
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
        uf: '',
        _id: ''
      },
      name: ''
    }
  },
  mounted () {
    if (this.$route.params._id) {
      this.form.name = this.$route.params.name
      this.form.uf = this.$route.params.uf
      this.form._id = this.$route.params._id
      this.name = 'edição'
    } else {
      this.name = 'cadastro'
    }
  },
  methods: {
    async cadastrar () {
      try {
        if (this.form._id) {
          await this.$axios.put(`/states/${this.form._id}`, {
            ...this.form
          })
          await this.$router.push({ name: 'states' })
        } else {
          await this.$axios.post('/states', {
            ...this.form
          })
          await this.$router.push({ name: 'states' })
        }
      } catch (e) {
        console.log(e)
      }
    },
    onReset () {

    },
    async backTo () {
      this.form.name = ''
      this.form.uf = ''
      await this.$router.push({ name: 'states' })
    }
  }
}
</script>
