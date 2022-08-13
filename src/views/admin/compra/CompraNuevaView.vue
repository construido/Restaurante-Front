<template>
    <div class="p-fluid grid my-4">
        <div class="field col-12 md:col-4">
            <span class="p-inputgroup">
                <span class="p-float-label">
                    <InputText id="buscar" type="text" v-model="buscar"/>
                    <label for="buscar">Nombre o Código</label>
                </span>
                <Button v-tooltip.top="'Buscar Producto'" icon="pi pi-search" class="p-button-primary" @click="buscarProduco()"></Button>
            </span>
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputText id="producto" type="text" v-model="datosProducto.producto" disabled/>
                <label for="producto">Producto</label>
            </span>
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputText id="categoria" type="text" v-model="datosProducto.categoria" disabled/>
                <label for="categoria">Categoria</label>
            </span>
        </div>
    </div>

    <div class="p-fluid grid">
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber id="precio" type="text" mode="currency" currency="BOB" locale="es-BO" v-model="datosProducto.precio" disabled/>
                <label for="precio">Precio</label>
            </span>
        </div>
        <div class="field col-12 md:col-3">
            <span class="p-float-label">
                <InputText id="cantidad" type="number" v-model="datosProducto.cantidad"/>
                <label for="cantidad">Cantidad</label>
            </span>
        </div>
        <div class="field col-12 md:col-3">
            <span class="p-float-label">
                <InputNumber id="stock" type="text" v-model="datosProducto.stock" disabled/>
                <label for="stock">Stock</label>
            </span>
        </div>

        <div class="field col-12 md:col-2">
            <Button v-tooltip.top="'Llenar Carrito'" class="p-button-secondary" label="ACEPTAR" @click="llenarDetalle()"></Button>
        </div>
    </div>

    <div class="p-fluid grid">
        <div class="field col-12 md:col-8">
            <DataTable :value="arrayDetalle" responsiveLayout="scroll">
                <Column header="#">
                    <template #body="slotProps">
                        {{slotProps.index + 1}}
                    </template>
                </Column>
                <Column field="Producto" header="PRODUCTO"></Column>
                <Column header="PRECIO"  class="text-right">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.Precio)}}
                    </template>
                </Column>
                <Column field="Cantidad" header="CANTIDAD" class="text-right"></Column>
                <Column header="SUB TOTAL" class="text-right">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.Sub_Total)}}
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem" header="ACCIONES" class="text-left">
                    <template #body="slotProps">
                        <Button title="Eliminar" icon="pi pi-times" 
                            class="p-button-rounded p-button-danger mr-2" @click="eliminar(slotProps.index)">
                        </Button>
                    </template>
                </Column>
            </DataTable>
            <div class="mt-2">
                <label> <b> TOTAL </b> {{formatCurrency(total_compra)}} </label>
            </div>
        </div>

        <div class="field col-12 md:col-4">
            <span class="p-inputgroup mt-2">
                <span class="p-float-label">
                    <InputText id="buscar" type="text" v-model="buscarP"/>
                    <label for="buscar">Nombre o NIT</label>
                </span>
                <Button v-tooltip.top="'Buscar Proveedor'" icon="pi pi-search" class="p-button-primary" @click="buscarProveedor()"></Button>
            </span>
            <span class="p-float-label mt-4 mb-3">
                <InputText id="buscar" type="text" v-model="datosProveedor.nombre"/>
                <label for="buscar">Proveedor</label>
            </span>
            <Button v-tooltip.top="'Guardar Compra'" class="p-button-success" label="GUARDAR" @click="guardar()"></Button>
        </div>
    </div>

</template>

<script>
import * as proveedor from "@/services/proveedor.service"
import * as producto from "@/services/producto.service"
import * as compra from "@/services/compra.service"
import { ref } from '@vue/reactivity'

export default {
    setup(){
        const datosProveedor = ref({
            id: 0,
            nombre: ''
        })
        const total_compra = ref(0)
        const buscarP = ref('')
        const buscar = ref('')
        const datosProducto = ref({
            id: 0,
            stock: 0,
            precio: 0,
            producto: '',
            cantidad: '',
            categoria: '',         
        })
        const arrayDetalle = ref([])
        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        }

        function buscarProduco(){
            producto.buscar(buscar.value)
            .then(res => {
                datosProducto.value.id        = res.data[0].ID_Producto
                datosProducto.value.stock     = res.data[0].Stock
                datosProducto.value.precio    = res.data[0].Precio_Compra_P
                datosProducto.value.producto  = res.data[0].Nombre_Producto
                datosProducto.value.categoria = res.data[0].Categoria
            })
        }
        function llenarDetalle(){
            arrayDetalle.value.push({
                ID: datosProducto.value.id,
                Precio: datosProducto.value.precio,
                Producto: datosProducto.value.producto,
                Cantidad: datosProducto.value.cantidad,
                Sub_Total: datosProducto.value.precio * datosProducto.value.cantidad
            })

            total_compra.value = total_compra.value + (datosProducto.value.precio * datosProducto.value.cantidad)
        }
        function eliminar(index){
            total_compra.value = total_compra.value - arrayDetalle.value[index].Sub_Total
            arrayDetalle.value.splice(index, 1)
        }
        function buscarProveedor(){
            proveedor.buscar(buscarP.value)
            .then(res => {
                datosProveedor.value.id      = res.data[0].ID_Proveedor
                datosProveedor.value.nombre  = res.data[0].Nombre_Razon_Social_Proveedor
            })
        }
        function guardar(){
            compra.guardar(datosProveedor.value, arrayDetalle.value, total_compra.value)
            .then(res => {
                console.log(res)
            })
        }

        return {
            datosProveedor,
            datosProducto,
            arrayDetalle,
            total_compra,
            buscarP,
            buscar,

            buscarProveedor,
            formatCurrency,
            llenarDetalle,
            buscarProduco,
            eliminar,
            guardar
        }
    }

}
</script>