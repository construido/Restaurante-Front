<template>

    <Button icon="pi pi-eye" title="Ver Detalle" class="p-button-rounded p-button-info" @click="abrirModal"></Button>

    <Dialog header="DETALLES DE COMPRA" v-model:visible="proveedorModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <DataTable :value="arrayDetalle" responsiveLayout="scroll">
            <Column field="Producto" header="PRODUCTO"></Column>
            <Column header="PRECIO" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Precio_Compra)}}
                </template>
            </Column>
            <Column field="Cantidad_Compra" header="CANTIDAD" class="text-right"></Column>
            <Column header="SUB TOTAL" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Monto_Parcial_Compra)}}
                </template>
            </Column>
        </DataTable>

        <template #footer>
            <Button label="Ok" icon="pi pi-check" class="p-button-primary p-button-text" @click="cerrarModal"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as compra from "@/services/compra.service"
import { ref, onMounted } from "vue"

export default {
    name: "ModalDetalle",

    props: {
        compra: { type: Number}
    },

    setup(props){
        const arrayDetalle = ref([])
        const idcompra = ref(props.compra)
        const proveedorModal = ref(false)
        const abrirModal = () => {
            proveedorModal.value = true;
        }
        const cerrarModal = () => {
            proveedorModal.value = false;
        }

        onMounted(() => {
            listarDetalle()
        });

        function listarDetalle(){
            compra.listarDetalle(idcompra.value)
            .then(res => {
                arrayDetalle.value = res.data
            })
        }
        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        }

        return {
            idcompra,
            abrirModal,
            cerrarModal,
            arrayDetalle,
            proveedorModal,
            formatCurrency
        }
    }
}
</script>