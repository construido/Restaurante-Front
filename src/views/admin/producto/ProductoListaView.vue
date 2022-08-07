<template>

    <Toast/>
    <ConfirmDialog></ConfirmDialog>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Producto" icon="pi pi-external-link" @click="$router.push('/producto/nuevo')"></Button>
        </template>
    </Toolbar>

    <DataTable :value="arrayProducto" responsiveLayout="scroll">
        <Column field="ID_Producto" header="#" class="text-right"></Column>
        <Column field="Nombre_Producto" header="NOMBRE"></Column>
        <Column field="Descripcion_Producto" header="DESCRIPCIÓN"></Column>
        <Column header="PRECIO"  class="text-right">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.Precio_Venta_P)}}
            </template>
        </Column>
        <Column field="Stock" header="STOCK"  class="text-right"></Column>
        <Column field="Categoria" header="CATEGORIA"></Column>
        <Column header="ESTADO">
            <template #body="slotProps">
                <span v-if="slotProps.data.Estado_Producto" style="color: darkgreen"> <b> Activo </b> </span>
                <span v-else style="color: crimson"> <b> Inactivo </b> </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-success mr-2" @click="cargarObjeto(slotProps.data)"></Button>
                <Button v-if="slotProps.data.Estado_Producto" title="Desactivar" icon="pi pi-lock" 
                    class="p-button-rounded p-button-danger mr-2" @click="confirmar(slotProps.data)">
                </Button>
                <Button v-else icon="pi pi-lock-open" title="Activar" class="p-button-rounded p-button-primary" @click="confirmar(slotProps.data)"></Button>
            </template>
        </Column>
    </DataTable>

</template>

<script>
import * as producto from "@/services/producto.service"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"
import router from "@/router"
import store from '@/store'

export default {
    setup(){
        const toast = useToast()
        const confirm = useConfirm()
        const arrayProducto = ref()
        const datosProducto = ref({
            id: 0,
            estado: ''
        })

        const confirmar = (producto) => {
            let headers = producto.Estado_Producto == 1 ? 'Desactivar producto' : 'Activar producto'
            let icons   = producto.Estado_Producto == 1 ? 'pi pi-info-circle' : 'pi pi-exclamation-triangle'
            let button  = producto.Estado_Producto == 1 ? 'p-button-danger' : 'p-button-primary'
            let detalle = producto.Estado_Producto == 1 ? 'Producto desactivado' : 'Producto activado'
            datosProducto.value.id     = producto.ID_Producto
            datosProducto.value.estado = producto.Estado_Producto

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
            store.dispatch('limpiarProducto')
            listar()
        })

        function listar(){
            producto.listar()
            .then(res => {
                arrayProducto.value = res.data
            });
        }
        function eliminar(){
            producto.eliminar(datosProducto.value)
            .then(res => {
                listar()
            });
        }
        function cargarObjeto(producto){
            store.dispatch('cargarProducto', producto)
            router.push('/producto/editar')
        }
        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        };

        return{
            confirmar,

            cargarObjeto,
            arrayProducto,
            formatCurrency,
        }
    }
}
</script>