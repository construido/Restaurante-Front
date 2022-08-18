<template>
    <div class="card">

        <Toast/>
        <ConfirmDialog></ConfirmDialog>

        <Toolbar class="mb-4">
            <template #start>
                <ModalNuevo :listar="listar"></ModalNuevo>
            </template>
        </Toolbar>
        
        <DataTable :value="arrayCliente" responsiveLayout="scroll" class="p-datatable-sm">
            <Column field="ID_Cliente" header="#" class="text-right"></Column>
            <Column field="Nombre_Razon_Social_Cliente" header="RAZÓN SOCIAL"></Column>
            <Column field="CI_NIT_Cliente" header="CI / NIT" class="text-right"></Column>
            <Column field="Telefono_Cliente" header="TELEFONO"  class="text-right"></Column>
            <Column field="Correo_Cliente" header="CORREO"></Column>
            <Column header="ESTADO">
                <template #body="slotProps">
                    <span v-if="slotProps.data.Estado_Cliente" style="color: darkgreen"> <b> Activo </b> </span>
                    <span v-else style="color: crimson"> <b> Inactivo </b> </span>
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
                <template #body="slotProps">
                    <ModalEditar v-on:listar="listar" :cliente="slotProps.data"></ModalEditar>
                    <Button v-if="slotProps.data.Estado_Cliente" title="Desactivar" icon="pi pi-lock" 
                        class="p-button-rounded p-button-danger mr-2" @click="confirmar(slotProps.data)">
                    </Button>
                    <Button v-else icon="pi pi-lock-open" title="Activar" class="p-button-rounded p-button-primary" @click="confirmar(slotProps.data)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import ModalEditar from "@/components/cliente/ModalEditar.vue"
import ModalNuevo from "@/components/cliente/ModalNuevo.vue"
import * as cliente from "@/services/cliente.service"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"

export default {
    components: {
        ModalNuevo,
        ModalEditar
    },

    setup(){
        function message(){
            console.log('Click desde el padre')
        }
        const toast = useToast()
        const confirm = useConfirm()
        const arrayCliente = ref()
        const datosCliente = ref({
            id: 0,
            estado: ''
        })

        const confirmar = (cliente) => {
            let headers = cliente.Estado_Cliente == 1 ? 'Desactivar cliente' : 'Activar cliente'
            let icons   = cliente.Estado_Cliente == 1 ? 'pi pi-info-circle' : 'pi pi-exclamation-triangle'
            let button  = cliente.Estado_Cliente == 1 ? 'p-button-danger' : 'p-button-primary'
            let detalle = cliente.Estado_Cliente == 1 ? 'Cliente desactivado' : 'Cliente activado'
            datosCliente.value.id     = cliente.ID_Cliente
            datosCliente.value.estado = cliente.Estado_Cliente

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
            cliente.listar()
            .then(res => {
                arrayCliente.value = res.data
            });
        }
        function eliminar(){
            cliente.eliminar(datosCliente.value)
            .then(res => {
                listar()
            });
        }

        return{
            message,
            listar,
            confirmar,
            arrayCliente
        }
    }
}
</script>