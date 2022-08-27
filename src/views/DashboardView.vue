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
            <!--<div class="card">
                <h5>VENTAS RECIENTES</h5>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column style="width:15%">
                        <template #header>
                            Image
                        </template>
                        <template #body="slotProps">
                            <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" style="width:35%"></Column>
                    <Column field="price" header="Price" :sortable="true" style="width:35%">
                        <template #body="slotProps">
                            {{formatCurrency(slotProps.data.price)}}
                        </template>
                    </Column>
                    <Column style="width:15%">
                        <template #header>
                            View
                        </template>
                        <template #body>
                            <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>-->

            <div class="card">
                <div class="flex justify-content-between align-items-center mb-5">
                    <h5>PRODUCTOS MÁS VENDIDOS</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                        <Menu ref="menu2" :popup="true" :model="items"></Menu>
                    </div>
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Yogurt</span>
                            <div class="mt-1 text-600">Lácteos</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
                                <div class="bg-green-500 h-full" style="width:35%"></div>
                            </div>
                            <span class="text-green-500 ml-3 font-medium">%35</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Leche Saborizada</span>
                            <div class="mt-1 text-600">Lácteos</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
                                <div class="bg-purple-500 h-full" style="width:75%"></div>
                            </div>
                            <span class="text-purple-500 ml-3 font-medium">%75</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Cocla Cola 3lt</span>
                            <div class="mt-1 text-600">Gaseosas</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
                                <div class="bg-teal-500 h-full" style="width:40%"></div>
                            </div>
                            <span class="text-teal-500 ml-3 font-medium">%40</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>RESUMEN DE VENTAS</h5>
                <Chart type="line" :data="lineData" :options="lineOptions"/>
            </div>
        </div>

	</div>
</template>

<script>
import * as dashboard from '@/services/dashboard.service'
import { ref, onMounted } from "vue"

export default {
    setup(){
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
            //if(value)
                return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			//return;
        }

        onMounted(() => {
            listarProductos()
            listarClientes()
            listarCompras()
            listarVentas()
        })

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

        const lineData = ref({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Compras',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4
                },
                {
                    label: 'Ventas',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: '#00bb7e',
                    borderColor: '#00bb7e',
                    tension: 0.4
                }
            ]
        })
        const lineOptions = ref(null)

        return {
            ventas,
            compras,
            clientes,
            productos,
            formatCurrency,

            lineData,
            lineOptions
        }
    }
}
</script>