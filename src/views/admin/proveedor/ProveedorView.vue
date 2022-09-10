<template>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <ModalNuevo :listar="listar"></ModalNuevo>
            </template>
            <template #end>
                <div class="grcaja p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <InputText placeholder="filtrar por nombre..." v-model="filters"/>
                            <Button icon="pi pi-search" class="p-button-primary p-button-outlined"
                                v-tooltip.top="'Filtrar proveedores'" @click="listar()">
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toolbar>
        
        <DataTable :value="arrayProveedor" responsiveLayout="scroll" class="p-datatable-sm"
            ref="dt" :lazy="true" :rows="10" :paginator="true" :loading="loading" :totalRecords="totalRecords"
            @page="onPage($event)" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Proveedores">
            <Column header="#" class="text-right">
                <template #body="slotProps">
                    {{ slotProps.index + 1}}
                </template>
            </Column>
            <Column field="Nombre_Razon_Social_Proveedor" header="RAZÓN SOCIAL"></Column>
            <Column field="CI_NIT_Proveedor" header="CI / NIT" class="text-right"></Column>
            <Column field="Telefono_Proveedor" header="TELEFONO"  class="text-right"></Column>
            <Column field="Correo_Proveedor" header="CORREO"></Column>
            <Column header="ESTADO">
                <template #body="slotProps">
                    <span v-if="slotProps.data.Estado_Proveedor" style="color: darkgreen"> <b> Activo </b> </span>
                    <span v-else style="color: crimson"> <b> Inactivo </b> </span>
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
                <template #body="slotProps">
                    <ModalEditar v-on:listar="listar" :proveedor="slotProps.data"></ModalEditar>
                    <ModalEliminar v-on:listar="listar" :proveedor="slotProps.data"></ModalEliminar>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import ModalEliminar from "@/components/proveedor/ModalEliminar.vue"
import ModalEditar from "@/components/proveedor/ModalEditar.vue"
import ModalNuevo from "@/components/proveedor/ModalNuevo.vue"
import * as proveedor from "@/services/proveedor.service"
import { ref, onMounted } from "vue"

export default {
    components: {
        ModalEliminar,
        ModalEditar,
        ModalNuevo,
    },

    setup(){
        const dt = ref()
        const filters = ref('')
        const loading = ref(false)
        const lazyParams = ref()
        const totalRecords = ref(0)
        const onPage = (event) => {
            lazyParams.value = event
            listar()
        }
        const arrayProveedor = ref()

        onMounted(() => {
            lazyParams.value = {
                first: 0,
                rows: dt.value.rows,
                sortField: null,
                sortOrder: null,
                page: 0
            }
            listar()
        })

        function listar(){
            proveedor.listar(lazyParams.value, filters.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayProveedor.value = res.data.data
                    totalRecords.value  = res.data.total
                    loading.value = false
                }, 2000)
            });
        }

        return{
            dt,
            onPage,
            filters,
            loading,
            totalRecords,

            listar,
            arrayProveedor
        }
    }
}
</script>