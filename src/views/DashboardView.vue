<template>
	<div class="grid">

		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">CLIENTES</span>
						<div class="text-900 font-medium text-xl">{{ clientes }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-users text-blue-500 text-xl"></i>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">PRODUCTOS</span>
						<div class="text-900 font-medium text-xl">{{ productos }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-shopping-cart text-orange-500 text-xl"></i>
					</div>
				</div>
			</div>
		</div>

        <div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">VENTAS : {{ ventas.venta }}</span>
						<div class="text-900 font-medium text-xl">{{ formatCurrency(ventas.total) }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width:2.5rem;height:2.5rem">
						<!--<i class="pi pi-credit-card text-purple-500 text-xl"></i>-->
                        <i class="pi pi-arrow-up text-green-500 text-xl"></i>
					</div>
				</div>
				<!--<span class="text-green-500 font-medium">85 </span>
				<span class="text-500">responded</span>-->
			</div>
		</div>

		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">COMPRAS : {{ compras.compra }}</span>
						<div class="text-900 font-medium text-xl">{{ formatCurrency(compras.total) }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-red-100 border-round" style="width:2.5rem;height:2.5rem">
						<!--<i class="pi pi-sort-numeric-down text-cyan-500 text-xl"></i>-->
                        <i class="pi pi-arrow-down text-red-500 text-xl"></i>
					</div>
				</div>
			</div>
		</div>

        <div class="col-12 xl:col-6">
            <div class="card mb-0">
                <h5><b>MÁS VENDIDOS</b></h5>
                <ul class="list-none p-0 m-0" v-for="(producto, index) of productosVendidos" :key="producto.index">
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ producto.Nombre_Producto }}</span>
                            <div class="mt-1 text-600">{{ producto.Nombre_Categoria }}</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
                                <div :class="color[index] + ' h-full'" :style="'width:' + producto.Porcentaje"></div>
                            </div>
                            <span :class="text[index] + ' ml-3 font-medium'">{{ producto.Porcentaje }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card mb-0">
                <h5><b>STOCK MÍNIMO</b></h5>
                <DataTable :value="arrayStock" class="p-datatable-sm" responsiveLayout="scroll">
                    <Column field="Nombre_Producto" header="PRODUCTO"></Column>
                    <Column field="Nombre_Categoria" header="CATEGORIA"></Column>
                    <Column field="Stock" header="STOCK" class="text-right"></Column>
                </DataTable>
            </div>
        </div>
	</div>
</template>

<script>
import * as dashboard from '@/services/dashboard.service'
import { ref, onMounted } from "vue"

export default {
    setup(){
        const arrayStock = ref([])
        const productosVendidos = ref()
        const productos = ref()
        const clientes = ref()
        const compras = ref({
            total: 0,
            compra: 0
        })
        const ventas = ref({
            total: 0,
            venta: 0
        })
        const formatCurrency = (value) => {
            return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
        }
        const color = ref([
            'bg-cyan-500',
            'bg-teal-500',
            'bg-green-500'
        ])
        const text = ref([
            'text-cyan-500',
            'text-teal-500',
            'text-green-500'
        ])
        
        onMounted(() => {
            porcentajeProductos()
            listarProductos()
            listarClientes()
            listarCompras()
            productoStock()
            listarVentas()
        })

        function productoStock(){
            dashboard.productoStock()
            .then(res => {
                arrayStock.value = res.data
            })
        }
        function porcentajeProductos(){
            dashboard.porcentajeProductos()
            .then(res => {
                productosVendidos.value = res.data
            })
        }
        function listarProductos(){
            dashboard.listarProductos()
            .then(res => {
                productos.value = res.data[0].Producto
            })
        }
        function listarClientes(){
            dashboard.listarClientes()
            .then(res => {
                clientes.value = res.data[0].Cliente
            })
        }
        function listarCompras(){
            dashboard.listarCompras()
            .then(res => {
                compras.value.compra = res.data[0].Compra
                compras.value.total = (res.data[0].Total ? res.data[0].Total : 0)
            })  
        }
        function listarVentas(){
            dashboard.listarVentas()
            .then(res => {
                ventas.value.venta = res.data[0].Venta
                ventas.value.total = (res.data[0].Total ? res.data[0].Total : 0)
            })
        }

        return {
            text,
            color,

            ventas,
            compras,
            clientes,
            productos,
            formatCurrency,
            productosVendidos,
            arrayStock,
        }
    }
}
</script>