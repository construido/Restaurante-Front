<template>
    <div class="card">
        <Toolbar class="mb-2">
            <!--<template #start>
                <Button label="Nuevo Producto" icon="pi pi-external-link" @click="$router.push('/producto/nuevo')"></Button>
            </template>-->
            <template #start>
                <h4> <b> ENTRADAS DE PRODUCTOS </b> </h4>
            </template>
            <template #end>
                <div class="p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <InputText placeholder="código o categoría" v-model="filters" style="text-transform: uppercase"/>
                            <Button icon="pi pi-search" class="p-button-primary p-button-outlined"
                                v-tooltip.top="'Filtrar'" @click="listar()">
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toolbar>

        <DataTable :value="arrayProducto" responsiveLayout="scroll" class="p-datatable-sm"
                ref="dt" :lazy="true" :rows="1000" :paginator="true" :loading="loading" :totalRecords="totalRecords"
                @page="onPage($event)" paginatorTemplate="CurrentPageReport" scrollHeight="800px"
                :currentPageReportTemplate="'Cantidad de Productos {totalRecords} - Valor: ' + total">
            <Column header="#" class="text-right">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <!--<Column field="ID_Compra" header="COMPRA"></Column>-->
            <Column header="FECHA" class="text-right" style="white-space:nowrap">
                <template #body="slotProps">
                    {{formatDate(slotProps.data.Fecha_Compra)}}
                </template>
            </Column>
            <Column field="Codigo_Producto" header="CÓDIGO" class="text-right"></Column>
            <Column field="Nombre_Producto" header="PRODUCTO"></Column>
            <Column field="Nombre_Categoria" header="CATEGORÍA"></Column>
            <Column header="PRECIO" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Precio_Compra)}}
                </template>
            </Column>
            <Column field="Cantidad_Compra" header="CANTIDAD" class="text-right"></Column>
            <Column header="S. TOTAL" class="text-right" style="white-space:nowrap">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Monto_Parcial_Compra)}}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import * as producto from "@/services/producto.service"
import { ref, onMounted } from "vue"
import store from '@/store'
import moment from 'moment'

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
                total.value = total.value + datos[i].Monto_Parcial_Compra
                totalRecords.value = totalRecords.value + datos[i].Cantidad_Compra
            }

            total.value = formatCurrency(total.value) ? formatCurrency(total.value) : 0
        }
        function listar(){
            producto.entrada(lazyParams.value, filters.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayProducto.value = res.data.data
                    // totalRecords.value  = res.data.total
                    filters.value = ''
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
        const formatDate = (value) => {
            if(value)
				return moment(value).format("DD-MM-YY")
			return;
        }

        return{
            dt,
            onPage,
            filters,
            loading,
            totalRecords,

            total,
            listar,

            formatDate,
            arrayProducto,
            formatCurrency,
        }
    }
}
</script>