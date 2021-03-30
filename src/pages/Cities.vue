<template>
  <q-page padding>
    <q-table
        title="Cities"
        :data="states"
        :columns="columns"
        row-key="name"
    >
      <template v-slot:top-right>
        <q-btn
            icon="add"
            color="primary"
            label="Novo"
            @click="goTo"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
              icon="delete"
              color="negative"
              @click="confirmDelete(props.row)"
              dense
          />
          <q-btn
              icon="edit"
              color="primary"
              @click="goToEditing(props.row)"
              dense
          />
        </q-td>
      </template>
    </q-table>
  </q-page>

</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        {
          name: 'name',
          label: 'Nome do Estado',
          field: 'name',
          sortable: true,
          align: 'left'
        },
        {
          name: 'stateId',
          label: 'Id do estado',
          field: 'stateId',
          sortable: true,
          align: 'left'
        },
        {
          name: 'actions',
          label: 'Ações',
          field: 'actions',
          align: 'left'
        }
      ],
      states: []
    }
  },
  mounted () {
    this.getStates()
  },
  methods: {
    async getStates () {
      try {
        const response = await this.$axios.get('/cities')
        this.states = response.data.DATA
      } catch (e) {
      }
    },
    async deleteState (id) {
      try {
        await this.$axios.delete(`/cities/${id}`)
        await this.getStates()
      } catch (e) {
      }
    },
    confirmDelete (row) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Você deseja Excluir a cidade ${row.name}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteState(row._id)
      }).onCancel(() => {
      })
    },
    goTo () {
      this.$router.push({ name: 'formCities' })
    },
    goToEditing (row) {
      this.$router.push({ name: 'formCities', params: { name: row.name, stateId: row.stateId, _id: row._id } })
    }

  }

}
</script>
