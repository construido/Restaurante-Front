<template>

    <Toast/>
    <ConfirmDialog></ConfirmDialog>

    <Button v-if="datosProveedor.estado == 1" title="Desactivar" icon="pi pi-lock"
        class="p-button-rounded p-button-danger mr-2" @click="confirmar()">
    </Button>
    <Button v-else icon="pi pi-lock-open" title="Activar" class="p-button-rounded p-button-primary"
        @click="confirmar()">
    </Button>
</template>

<script>
import * as proveedor from "@/services/proveedor.service"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: 'ModalEliminar',
    emits: ["listar"],

    props: {
        proveedor: { type: Object }
    },
    
    setup(props, { emit }){
        const toast = useToast()
        const confirm = useConfirm()
        const datosProveedor = ref({
            id:     props.proveedor.ID_Proveedor,
            estado: props.proveedor.Estado_Proveedor,
        })

        const confirmar = () => {
            let headers = props.proveedor.Estado_Proveedor == 1 ? 'Desactivar Proveedor' : 'Activar Proveedor'
            let icons   = props.proveedor.Estado_Proveedor == 1 ? 'pi pi-info-circle' : 'pi pi-exclamation-triangle'
            let button  = props.proveedor.Estado_Proveedor == 1 ? 'p-button-danger' : 'p-button-primary'
            let detalle = props.proveedor.Estado_Proveedor == 1 ? 'Proveedor desactivado' : 'Proveedor activado'

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

        function eliminar(){
            proveedor.eliminar(datosProveedor.value)
            .then(res => {
                console.log(res.data.Estado_Proveedor)
                emit("listar")
                datosProveedor.value.estado = res.data.Estado_Proveedor
            })
        }
        return {
            eliminar,
            confirmar,

            datosProveedor,
        }
    }
}
</script>
