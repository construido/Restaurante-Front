<template>

    <Toast/>
    <ConfirmDialog></ConfirmDialog>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nueva Compra" icon="pi pi-external-link" @click="$router.push('/compra/nuevo')"></Button>
        </template>
    </Toolbar>

    <DataTable :value="arrayCompra" responsiveLayout="scroll" class="p-datatable-sm" style="white-space:nowrap"
        ref="dt" :lazy="true" :rows="10" :paginator="true" :loading="loading" :totalRecords="totalRecords" @page="onPage($event)"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]" currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Compras">
        <Column field="ID_Compra" header="#" class="text-right"></Column>
        <Column header="FECHA" class="text-right">
            <template #body="slotProps">
                {{formatDate(slotProps.data.Fecha_Compra)}}
            </template>
        </Column>
        <Column header="MONTO" class="text-right">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.Monto_Total_Compra)}}
            </template>
        </Column>
        <Column field="Empleado" header="EMPLEADO" ></Column>
        <Column field="Proveedor" header="PROVEEDOR"></Column>
        <Column header="ESTADO">
            <template #body="slotProps">
                <span v-if="slotProps.data.Estado_Compra" style="color: darkgreen"> <b> Activo </b> </span>
                <span v-else style="color: crimson"> <b> Inactivo </b> </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
            <template #body="slotProps">
                <ModalDetalle :compra="slotProps.data.ID_Compra"></ModalDetalle>
                <Button icon="pi pi-print" title="Imprimir Compra" class="p-button-rounded p-button-secondary mr-2 ml-2"></Button>
                <Button v-if="slotProps.data.Estado_Compra" title="Desactivar" icon="pi pi-lock"
                    class="p-button-rounded p-button-danger">
                </Button>
            </template>
        </Column>
    </DataTable>
</template>

<script>
import ModalDetalle from "@/components/compra/ModalDetalle.vue"
import * as compra from "@/services/compra.service"
import { ref, onMounted } from "vue"
import moment from 'moment';

export default {
    components: {
        ModalDetalle
    },

    setup(){
        const arrayCompra = ref()

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
            compra.listar(lazyParams.value)
            .then(res => {
                loading.value
                console.log(res)
                setTimeout(() => {
                    totalRecords.value  = res.data.total
                    arrayCompra.value = res.data.data
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
            dt,
            onPage,
            loading,
            totalRecords,

            arrayCompra,
            formatDate,
            formatCurrency,
        }
    }
}
</script>