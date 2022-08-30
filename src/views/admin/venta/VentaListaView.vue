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
        <Column field="ID_Venta" header="#" class="text-right"></Column>
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
        <Column field="Empleado" header="EMPLEADO" ></Column>
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
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"
import moment from 'moment';

export default {
    components: {
        ModalDetalle
    },

    setup(){
        const toast = useToast()
        const confirm = useConfirm()
        const arrayVenta = ref()
        const datosCompra = ref({
            id: 0,
            estado: ''
        })

        const confirmar = (producto) => {
            let headers = producto.Estado_Producto == 1 ? 'Desactivar producto' : 'Activar producto'
            let icons   = producto.Estado_Producto == 1 ? 'pi pi-info-circle' : 'pi pi-exclamation-triangle'
            let button  = producto.Estado_Producto == 1 ? 'p-button-danger' : 'p-button-primary'
            let detalle = producto.Estado_Producto == 1 ? 'Producto desactivado' : 'Producto activado'
            datosCompra.value.id     = producto.ID_Producto
            datosCompra.value.estado = producto.Estado_Producto

            confirm.require({
                message: 'Estás seguro de continuar?',
                header: headers,
                icon: icons,
                acceptClass: button,
                accept: () => {
                    eliminar()
                    toast.add({severity:'info', summary:'Confirmado', detail: detalle, life: 3000});
                    confirm.close()
                },
                reject: () => {
                    toast.add({severity:'error', summary:'Rechazado', detail:'Has rechazado', life: 3000});
                    confirm.close()
                }
            });
        }

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
                    arrayVenta.value = res.data.data
                    totalRecords.value  = res.data.total
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

            confirmar,

            arrayVenta,
            formatDate,
            formatCurrency,
        }
    }
}
</script>