<template>
    <div class="card">
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Nuevo Producto" icon="pi pi-external-link" @click="$router.push('/producto/nuevo')"></Button>
            </template>
            <template #end>
                <div class="p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <InputText placeholder="filtrar por nombre..." v-model="filters"/>
                            <Button icon="pi pi-search" class="p-button-primary p-button-outlined"
                                v-tooltip.top="'Filtrar Productos'" @click="listar()">
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toolbar>

        <DataTable :value="arrayProducto" responsiveLayout="scroll" class="p-datatable-sm" :rowClass="rowClass"
                ref="dt" :lazy="true" :rows="1000" :paginator="true" :loading="loading" :totalRecords="totalRecords"
                @page="onPage($event)" paginatorTemplate="CurrentPageReport" scrollHeight="800px"
                :currentPageReportTemplate="'Cantidad de Productos {totalRecords} - Valor: ' + total">
            <Column header="#" class="text-right">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="Codigo_Producto" header="CÓDIGO"></Column>
            <Column field="Nombre_Producto" header="NOMBRE"></Column>
            <Column field="Descripcion_Producto" header="DESCRIPCIÓN"></Column>
            <Column field="Categoria" header="CATEGORIA"></Column>
            <Column header="P. Compra"  class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Precio_Compra_P)}}
                </template>
            </Column>
            <Column header="P. Venta"  class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Precio_Venta_P)}}
                </template>
            </Column>
            <Column field="Ingreso_Producto" header="INGRESO" class="text-right"></Column>
            <Column field="Salida_Producto" header="SALIDA" class="text-right"></Column>
            <Column field="Stock" header="STOCK" class="text-right"></Column>
            <Column field="Stock_Minimo" header="S/M" class="text-right"></Column>
            <Column header="S. TOTAL"  class="text-right">
                <template #body="slotProps">
                    {{formatCurrency((slotProps.data.Precio_Venta_P * slotProps.data.Stock))}}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import * as producto from "@/services/producto.service"
import { ref, onMounted } from "vue"
import store from '@/store'

export default {
    setup(){
        const total = ref(0)
        const dt = ref()
        const filters = ref('')
        const loading = ref(false)
        const lazyParams = ref()
        const totalRecords = ref(0)
        const onPage = (event) => {
            lazyParams.value = event
            listar()
        }
        const arrayProducto = ref()

        const rowClass = (data) => {
            let row

            if((data.Estado_Producto == 1) && (data.Stock > data.Stock_Minimo)) return row = 'row-activo'
            else if((data.Estado_Producto == 1) && (data.Stock <= data.Stock_Minimo)) return row = 'row-stock-minimo'
            else return row = 'row-inactivo'
        }

        onMounted(() => {
            lazyParams.value = {
                first: 0,
                rows: '',
                sortField: null,
                sortOrder: null,
                page: 0
            }
            store.dispatch('limpiarProducto')
            listar()
        })

        function sumaTotal(datos){
            for(var i=0; i<datos.length; i++) {
                total.value = total.value + (datos[i].Stock * datos[i].Precio_Venta_P)
            }

            total.value = formatCurrency(total.value)
        }
        function listar(){
            producto.listar(lazyParams.value, filters.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayProducto.value = res.data.data
                    totalRecords.value  = res.data.total
                    total.value = 0
                    sumaTotal(res.data.data)
                    loading.value = false
                }, 2000)
            })
        }
        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        }

        return{
            dt,
            onPage,
            filters,
            loading,
            rowClass,
            totalRecords,

            total,
            listar,

            arrayProducto,
            formatCurrency,
        }
    }
}
</script>
<style scoped lang="scss">
    ::v-deep(.row-activo) {
        background-color: rgba(60, 179, 113, 0.2) !important;
    }
    ::v-deep(.row-inactivo) {
        background-color: rgba(0, 0, 255, 0.1) !important;
    }
    ::v-deep(.row-stock-minimo) {
        background-color: rgba(255, 48, 46, 0.2) !important;
    }
</style>