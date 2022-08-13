<template>

    <Toast/>
    <ConfirmDialog></ConfirmDialog>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nueva Compra" icon="pi pi-external-link" @click="$router.push('/compra/nuevo')"></Button>
        </template>
    </Toolbar>

    <DataTable :value="arrayCompra" responsiveLayout="scroll">
        <Column field="ID_Compra" header="#" class="text-right"></Column>
        <Column header="FECHA"  class="text-right">
            <template #body="slotProps">
                {{formatDate(slotProps.data.Fecha_Compra)}}
            </template>
        </Column>
        <Column header="MONTO"  class="text-right">
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
        const arrayCompra = ref()
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

        onMounted(() => {
            listar()
        })

        function listar(){
            compra.listar()
            .then(res => {
                arrayCompra.value = res.data
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
            confirmar,

            arrayCompra,
            formatDate,
            formatCurrency,
        }
    }
}
</script>