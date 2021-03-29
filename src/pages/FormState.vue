<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <p class="text-h6">
          Formulário de cadastro de Estados
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
                label="Cadastrar"
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
        uf: ''
      }
    }
  },
  methods: {
    async cadastrar () {
      try {
        await this.$axios.post('/states', {
          ...this.form
        })
        await this.$router.push({ name: 'states' })
      } catch (e) {
        console.log(e)
      }
    },
    onReset () {

    },
    async backTo () {
      await this.$router.push({ name: 'states' })
    }
  }
}
</script>
