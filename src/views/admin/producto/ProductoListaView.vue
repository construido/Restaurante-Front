<template>

    <Toast/>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Producto" icon="pi pi-external-link" @click="$router.push('/producto/nuevo')"></Button>
        </template>
        <template #end>
            <div class="p-fluid">
                <div class="col-12 md:col-12">
                    <div class="p-inputgroup">
                        <!--<Button icon="pi pi-times" class="p-button-danger p-button-outlined"
                            v-tooltip.top="'Limpiar'">
                        </Button>-->
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
            ref="dt" :lazy="true" :rows="10" :paginator="true" :loading="loading" :totalRecords="totalRecords"
            @page="onPage($event)" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Productos">
        <Column header="#" class="text-right">
            <template #body="slotProps">
                {{ slotProps.index + 1 }}
            </template>
        </Column>
        <Column field="Codigo_Producto" header="CÓDIGO"></Column>
        <Column field="Nombre_Producto" header="NOMBRE"></Column>
        <Column field="Descripcion_Producto" header="DESCRIPCIÓN"></Column>
        <Column header="PRECIO"  class="text-right">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.Precio_Venta_P)}}
            </template>
        </Column>
        <Column field="Stock" header="STOCK" class="text-right"></Column>
        <Column field="Categoria" header="CATEGORIA"></Column>
        <Column header="IMAGEN">
            <template #body="slotProps">
                <img :src="slotProps.data.Foto_Producto" class="product-image"  style="width: 150px; display: block;">
            </template>
        </Column>
        <Column header="ESTADO">
            <template #body="slotProps">
                <span v-if="slotProps.data.Estado_Producto" style="color: darkgreen"> <b> Activo </b> </span>
                <span v-else style="color: crimson"> <b> Inactivo </b> </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                    v-tooltip.top="'Editar Producto'" @click="cargarObjeto(slotProps.data)">
                </Button>
                <Button v-if="slotProps.data.Estado_Producto" v-tooltip.top="'Desactivar Producto'" icon="pi pi-lock" 
                    class="p-button-rounded p-button-danger mr-2" @click="confirmar(slotProps.data)">
                </Button>
                <Button v-else icon="pi pi-lock-open" v-tooltip.top="'Activar Producto'"
                    class="p-button-rounded p-button-primary" @click="confirmar(slotProps.data)">
                </Button>
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
        const dt = ref()
        const filters = ref('')
        const loading = ref(false)
        const lazyParams = ref()
        const totalRecords = ref(0)
        const onPage = (event) => {
            lazyParams.value = event
            listar()
        }
        const toast = useToast()
        const confirm = useConfirm()
        const arrayProducto = ref()
        const datosProducto = ref({})

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
            lazyParams.value = {
                first: 0,
                rows: dt.value.rows,
                sortField: null,
                sortOrder: null,
                page: 0
            }
            store.dispatch('limpiarProducto')
            listar()
        })

        function listar(){
            producto.listar(lazyParams.value, filters.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayProducto.value = res.data.data
                    totalRecords.value  = res.data.total
                    loading.value = false
                    filters.value = ''
                }, 2000)
            })
        }
        function eliminar(){
            producto.eliminar(datosProducto.value)
            .then(res => {
                datosProducto.value = {}
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
        }

        return{
            dt,
            onPage,
            filters,
            loading,
            totalRecords,

            listar,
            confirmar,

            cargarObjeto,
            arrayProducto,
            formatCurrency,
        }
    }
}
</script>