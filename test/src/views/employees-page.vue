<template>
  <div>
    <h2 class="content-block">Employees</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <DxDataGrid id="dataGrid" :data-source="employees" key-expr="Name" :columns="columns"
        :repaint-changes-only="true"
        @saving="save"
        >
        <DxEditing
        mode="form"
        :refresh-mode="'repaint'"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
      />
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
        {dataField: 'Name'},
        {dataField: 'JobPosition'},
        {dataField: 'Photo'},
        {dataField: 'Wage', dataType: 'numeric'},
        {dataField: 'Status'},
        {dataField: 'HireDate', dataType: 'date'},
      ],
      employees: []
    }
  },
  methods: {
    getEmployees() {
      axios.get(this.$djangoUrl + 'employees').then(res => {
        this.employees = res.data
      })
    },
    save(e){
      if (e.changes[0].type == 'insert'){
        var employee = e.changes[0].data
        axios.post(this.$djangoUrl + 'employees', employee).then(res=>{
          console.log(res.data)
        })

      }
    }
  },
  mounted() {
    this.getEmployees()
  }
}
</script>
