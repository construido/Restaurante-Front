<template>

    <Button icon="pi pi-eye" title="Ver Detalle" class="p-button-rounded p-button-info" @click="abrirModal"></Button>

    <Dialog header="DETALLES DE VENTA" v-model:visible="detalleVentaModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <DataTable :value="arrayDetalle" responsiveLayout="scroll">
            <Column field="Producto" header="PRODUCTO"></Column>
            <Column header="PRECIO" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Precio_Venta)}}
                </template>
            </Column>
            <Column field="Cantidad_Venta" header="CANTIDAD" class="text-right"></Column>
            <Column header="SUB TOTAL" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Monto_Parcial_Venta)}}
                </template>
            </Column>
        </DataTable>

        <template #footer>
            <Button label="Ok" icon="pi pi-check" class="p-button-primary p-button-text" @click="cerrarModal"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as venta from "@/services/venta.service"
import { ref, onMounted } from "vue"

export default {
    name: "ModalDetalle",

    props: {
        venta: { type: Number}
    },

    setup(props){
        const arrayDetalle = ref([])
        const idventa = ref(props.venta)
        const detalleVentaModal = ref(false)
        const abrirModal = () => {
            detalleVentaModal.value = true;
        }
        const cerrarModal = () => {
            detalleVentaModal.value = false;
        }

        onMounted(() => {
            listarDetalle()
        });

        function listarDetalle(){
            venta.listarDetalle(idventa.value)
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
            idventa,
            abrirModal,
            cerrarModal,
            arrayDetalle,
            detalleVentaModal,
            formatCurrency
        }
    }
}
</script>