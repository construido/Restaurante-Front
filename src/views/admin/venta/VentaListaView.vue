<template>

    <Toast/>
    <ConfirmDialog></ConfirmDialog>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nueva Venta" icon="pi pi-external-link" @click="$router.push('/venta/nuevo')"></Button>
        </template>
    </Toolbar>

    <DataTable :value="arrayVenta" responsiveLayout="scroll" class="p-datatable-sm" style="white-space:nowrap"
        ref="dt" :lazy="true" :rows="10" :paginator="true" :loading="loading" :totalRecords="totalRecords" @page="onPage($event)"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]" currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Ventas">
        <Column header="#" class="text-right">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column header="FECHA"  class="text-right">
            <template #body="slotProps">
                {{formatDate(slotProps.data.Fecha_Venta)}}
            </template>
        </Column>
        <Column header="MONTO"  class="text-right">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.Monto_Total_Venta)}}
            </template>
        </Column>
        <Column field="Cliente" header="CLIENTE"></Column>
        <Column v-if="estado == 1" field="Empleado" header="EMPLEADO" ></Column>
        <Column header="ESTADO">
            <template #body="slotProps">
                <span v-if="slotProps.data.Estado_Venta" style="color: darkgreen"> <b> Activo </b> </span>
                <span v-else style="color: crimson"> <b> Inactivo </b> </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
            <template #body="slotProps">
                <ModalDetalle :venta="slotProps.data.ID_Venta"></ModalDetalle>
                <Button icon="pi pi-print" title="Imprimir Venta" class="p-button-rounded p-button-secondary mr-2 ml-2"></Button>
                <Button v-if="slotProps.data.Estado_Venta" title="Desactivar" icon="pi pi-lock"
                    class="p-button-rounded p-button-danger">
                </Button>
            </template>
        </Column>
    </DataTable>
</template>

<script>
import ModalDetalle from "@/components/venta/ModalDetalle.vue"
import * as venta from "@/services/venta.service"
import { ref, onMounted } from "vue"
import moment from 'moment';

export default {
    components: {
        ModalDetalle
    },

    setup(){
        const arrayVenta = ref()
        const estado = localStorage.getItem('estado')
        const dt = ref()
        const loading = ref(false)
        const lazyParams = ref()
        const totalRecords = ref(0)
        const onPage = (event) => {
            lazyParams.value = event
            listar()
        }

        onMounted(() => {
            loading.value = true
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
            venta.listar(lazyParams.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    totalRecords.value  = res.data.total
                    arrayVenta.value = res.data.data
                    loading.value = false
                }, 2000)
            })
        }
        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        }
        const formatDate = (value) => {
            if(value)
				return moment(value).format("DD/MM/YY")
			return;
        }

        return{
            estado,

            dt,
            onPage,
            loading,
            totalRecords,

            arrayVenta,
            formatDate,
            formatCurrency,
        }
    }
}
</script>