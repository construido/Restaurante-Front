<template>
    <div class="card">

        <Toast/>

        <Toolbar class="mb-4">
            <template #start>
                <Button label="Nueva Caja" icon="pi pi-external-link" @click="abrirModal()"></Button>
            </template>
            <!--<template #end>
                <div class="grcaja p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <InputText placeholder="filtrar por nombre..."/>
                            <Button icon="pi pi-search" class="p-button-primary p-button-outlined" v-tooltip.top="'Filtrar Cajas'" ></Button>
                        </div>
                    </div>
                </div>
            </template>-->
        </Toolbar>

        <Dialog :header="header" v-model:visible="cajaModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <div class="p-fluid grid p-4">
                <div v-if="btnCerrar != 2" class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <InputNumber id="inputtext" type="text" mode="currency" currency="BOB" locale="es-BO"  v-model="datosCaja.monto"/>
                        <label for="inputtext" autofocus>Monto</label>
                    </span>
                </div>

                <div class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <Textarea id="textarea" rows="3" v-model="datosCaja.observacion"></Textarea>
                        <label for="textarea">Observacion</label>
                    </span>
                </div>
            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" class="p-button-danger p-button-text"></Button>
                <Button v-if="btnCerrar == 1" label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="apertura()"></Button>
                <Button v-else-if="btnCerrar == 2" label="Aceptar" icon="pi pi-check" class="p-button-warning p-button-text" @click="cierre()"></Button>
                <Button v-else-if="btnCerrar == 3" label="Ok"
                    icon="pi pi-check" class="p-button-primary p-button-text" @click="ingresoSalida()">
                </Button>
            </template>
        </Dialog>

        <DataTable :value="arrayCaja" class="p-datatable-sm" responsiveLayout="scroll" ref="dt" :lazy="true" :rows="10" :paginator="true"
            :loading="loading" :totalRecords="totalRecords" @page="onPage($event)" @sort="onSort($event)"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 20, 50, 100]" currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Cajas">
            <Column field="ID_Caja" header="#" class="text-right"></Column>
            <Column header="APERTURA" class="text-right" style="white-space:nowrap">
                <template #body="slotProps">
                    {{formatDate(slotProps.data.Fecha_Apertura)}}
                </template>
            </Column>
            <Column header="CIERRE" class="text-right" style="white-space:nowrap">
                <template #body="slotProps">
                    {{formatDate(slotProps.data.Fecha_Cierre)}}
                </template>
            </Column>
            <Column header="INICIAL" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Saldo_Inicial)}}
                </template>
            </Column>
            <Column header="INGRESO" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Ingreso_Caja)}}
                </template>
            </Column>
            <Column header="SALIDA" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Salida_Caja)}}
                </template>
            </Column>
            <Column header="SALDO" class="text-right">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.Saldo_Caja)}}
                </template>
            </Column>
            <Column field="Observacion" header="OBSERVACION"></Column>
            <Column field="Empleado" header="EMPLEADO"></Column>
            <Column field="Estado_Caja" header="ESTADO">
                <template #body="slotProps">
                    <span v-if="slotProps.data.Estado_Caja == 1" style="color: darkgreen"> <b> Abierto </b> </span>
                    <span v-else-if="slotProps.data.Estado_Caja == 2" style="color: crimson"> <b> Cerrado </b> </span>
                </template>
            </Column>
            <Column header="ACCIONES" style="white-space:nowrap">
                <template #body="slotProps">
                    <Button icon="pi pi-eye" v-tooltip.top="'Ver Movimientos'" class="p-button-rounded p-button-info" @click="obtenerID(slotProps.data.ID_Caja)"></Button>
                    <Button icon="pi pi-print" v-tooltip.top="'Imprimir Movimientos'"  class="p-button-rounded p-button-secondary ml-2"></Button>
                    <template v-if="slotProps.data.Estado_Caja == 1">
                        <Button icon="pi pi-plus" v-tooltip.top="'Ingreso Caja'" 
                            class="p-button-rounded p-button-success ml-2" @click="obtenerDatos(slotProps.data.ID_Caja, 'Ingreso')">
                        </Button>
                        <Button icon="pi pi-minus" v-tooltip.top="'Salida Caja'" 
                            class="p-button-rounded p-button-warning ml-2" @click="obtenerDatos(slotProps.data.ID_Caja, 'Salida')">
                        </Button>
                        <Button icon="pi pi-lock" v-tooltip.top="'Cerrar Caja'" 
                            class="p-button-rounded p-button-danger ml-2" @click="llenarDatos(slotProps.data)">
                        </Button>
                    </template>
                </template>
            </Column>
        </DataTable>

        <Dialog header="MOVIMIENTOS" v-model:visible="detalleModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <DataTable :value="arrayDetalle" responsiveLayout="scroll">
                <Column field="Tipo_Movimiento" header="TIPO"></Column>
                <Column header="MONTO" class="text-right">    
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.Monto_Movimiento)}}
                    </template>
                </Column>
                <Column field="Observacion_Movimiento" header="OBSERVACIÓN"></Column>
            </DataTable>

            <template #footer>
                <Button label="Ok" icon="pi pi-check" class="p-button-primary p-button-text" @click="cerrarModalDetalle()"></Button>
            </template>
        </Dialog>

    </div>
</template>

<script>
import * as caja from "@/services/caja.service"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"
import moment from 'moment'

export default {
    setup(){
        const toast = useToast()
        const btnCerrar = ref(1)
        const header = ref('ABRIR CAJA')
        const dt = ref()
        // const filters = ref('')
        const loading = ref(false)
        const lazyParams = ref()
        const totalRecords = ref(0)
        const onPage = (event) => {
            lazyParams.value = event
            listar()
        }
        const onSort = (event) => {
            lazyParams.value.page = event
            listar()
        }

        const arrayCaja = ref()
        const datosCaja = ref({})
        const cajaModal  = ref(false)
        const abrirModal = () => {
            cajaModal.value = true;
        }
        const cerrarModal = () => {
            limpiarCampos()
            cajaModal.value = false;
        }

        const idCaja = ref(0)
        const arrayDetalle = ref()
        const detalleModal = ref(false)
        const abrirModalDetalle = () => {
            detalleModal.value = true;
        }
        const cerrarModalDetalle = () => {
            detalleModal.value = false;
        }

        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('es-BO', {style: 'currency', currency: 'BOB'});
			return;
        }
        const formatDate = (value) => {
            if(value)
				return moment(value).format("DD-MM-YYYY")
			return;
        }
        function toastMessage(color, header, message) {
            toast.add({severity: color, summary: header, detail: message, life: 3000})
        }

        onMounted(() => {
            loading.value = true
            lazyParams.value = {
                first: 0,
                rows: dt.value.rows,
                sortField: null,
                sortOrder: null,
                page: 0
            }
            listar()
        })

        function obtenerID(caja){
            idCaja.value = caja
            listarDetalle()
        }
        function listarDetalle(){
            caja.listarDetalle(idCaja.value)
            .then(res => {
                arrayDetalle.value = res.data
            })
            abrirModalDetalle()
        }
        function listar() {
            caja.listar(lazyParams.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayCaja.value = res.data.data
                    totalRecords.value  = res.data.total
                    loading.value = false
                }, 2000)
            })
        }
        function apertura(){
            caja.apertura(datosCaja.value)
            .then(res => {
                if(res.data == 1){
                    cerrarModal()
                    toastMessage('error', 'Error', 'Ya tienes una CAJA abierta')
                }else{
                    cerrarModal()
                    toastMessage('success', 'Éxito', 'Caja Abierta')
                    listar()
                }
            })
        }
        function llenarDatos(objeto){
            btnCerrar.value = 2
            header.value = 'CERRAR CAJA'
            datosCaja.value.id = objeto.ID_Caja
            datosCaja.value.observacion = objeto.Observacion
            abrirModal()
        }
        function cierre(){
            caja.cierre(datosCaja.value)
            .then(res => {
                listar()
                toastMessage('success', 'Éxito', 'Caja Cerrada')
                cerrarModal()
                limpiarCampos()
            })
        }
        function limpiarCampos(){
            btnCerrar.value = 1
            datosCaja.value = {}
            header.value = 'ABRIR CAJA'
        }
        function obtenerDatos(caja, tipo){
            btnCerrar.value = 3
            header.value = (tipo == 'Ingreso' ? 'INGRESO CAJA' : 'SALIDA CAJA')
            datosCaja.value.id = caja
            datosCaja.value.tipo = tipo
            abrirModal()
        }
        function ingresoSalida(){
            caja.ingresoSalida(datosCaja.value)
            .then(res => {
                if(res == 422){
                    toastMessage('error', 'Error', 'Los campos son obligatorios')
                }else{
                    toastMessage('info', 'Éxito', 'Actualizado Correctamente')
                    setTimeout(() => {
                        limpiarCampos()
                        cerrarModal()
                        listar()
                    }, 2000)
                }
            })
        }

        return {
            dt,
            onPage,
            onSort,
            loading,
            totalRecords,

            header,
            btnCerrar,
            cajaModal,
            abrirModal,
            cerrarModal,
            limpiarCampos,

            arrayCaja,
            datosCaja,

            cierre,
            apertura,
            llenarDatos,
            obtenerDatos,
            ingresoSalida,

            obtenerID,
            detalleModal,
            arrayDetalle,
            listarDetalle,
            abrirModalDetalle,
            cerrarModalDetalle,

            formatDate,
            formatCurrency,
        }
    }
}
</script>