<template>
    <div class="card">

        <Toast/>
        <ConfirmDialog></ConfirmDialog>

        <Toolbar class="mb-4">
            <template #start>
                <ModalNuevo :listar="listar"></ModalNuevo>
            </template>
        </Toolbar>
        
        <DataTable :value="arrayProveedor" responsiveLayout="scroll" class="p-datatable-sm">
            <Column field="ID_Proveedor" header="#" class="text-right"></Column>
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
        const arrayProveedor = ref()

        onMounted(() => {
            listar()
        })

        function listar(){
            proveedor.listar()
            .then(res => {
                arrayProveedor.value = res.data
            });
        }

        return{
            listar,
            arrayProveedor
        }
    }
}
</script>