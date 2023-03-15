<template>
  <div>
    <h2 class="content-block">Beneficiaries</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <DxDataGrid id="dataGrid" :data-source="beneficiaries" key-expr="Name" :columns="columns"
          :repaint-changes-only="true" @rowInserted="onRowInserted" @rowUpdated="onRowUpdated" @rowRemoved="onRowRemoved">
          <DxEditing mode="form" :refresh-mode="'repaint'" :allow-adding="true" :allow-updating="true"
            :allow-deleting="true" />
        </DxDataGrid>

      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxEditing
} from 'devextreme-vue/data-grid';
import axios from 'axios';
export default {
  components: {
    DxDataGrid,
    DxEditing
  },
  data() {
    return {
      columns: [
        { dataField: 'Name' },
        { dataField: 'Relationship' },
        { dataField: 'Gender' },
        { dataField: 'BirthDate', dataType: 'date' },
      ],
      beneficiaries: []
    }
  },
  methods: {
    getBeneficiaries() {
      axios.get(this.$djangoUrl + 'beneficiaries').then(res => {
        this.beneficiaries = res.data
      })
    },
    save(e) {
      if (e.changes[0].type == 'insert') {
        var employee = e.changes[0].data
        axios.post(this.$djangoUrl + 'beneficiaries', employee).then(res => {
          console.log(res.data)
        })

      }
    },
    onRowInserted(event) {
      const newRowData = event.data;
      axios.post(this.$djangoUrl + 'beneficiaries', newRowData).then((response) => {
        this.rows.push(response.data);
      });
    },
    onRowUpdated(event) {
      const updatedRowData = event.data;
      axios.put(this.$djangoUrl + 'beneficiaries/' + `${updatedRowData.id}`, updatedRowData).then(() => {
        const index = this.rows.findIndex((row) => row.id === updatedRowData.id);
        this.$set(this.rows, index, updatedRowData);
      });
    },
    onRowRemoved(event) {
      const deletedRowData = event.data;
      axios.delete(this.$djangoUrl + 'beneficiaries/' + `${deletedRowData.id}`).then(() => {
        const index = this.rows.findIndex((row) => row.id === deletedRowData.id);
        this.rows.splice(index, 1);
      });
    },
  },
  mounted() {
    this.getBeneficiaries()
  }
}
</script>
