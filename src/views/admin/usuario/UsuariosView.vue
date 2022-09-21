<template>
    <div class="card">

        <Toast/>

        <Toolbar class="mb-4">
            <template #start>
                <ModalNuevo :listar="listar"></ModalNuevo>
            </template>
            <template #end>
                <div class="p-fluid">
                    <div class="col-12 md:col-12">
                        <div class="p-inputgroup">
                            <InputText placeholder="nombre o apellido" v-model="filters"/>
                            <Button icon="pi pi-search" class="p-button-primary p-button-outlined"
                                v-tooltip.top="'Filtrar Usuario'" @click="listar()">
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toolbar>
        
        <DataTable :value="arrayUsuario" responsiveLayout="scroll" class="p-datatable-sm"
            ref="dt" :lazy="true" :rows="10" :paginator="true" :loading="loading" :totalRecords="totalRecords"
            @page="onPage($event)" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} Usuarios">
            <Column header="#" class="text-right">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column header="FECHA" class="text-right" style="white-space:nowrap">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.Fecha_Creacion_Login) }}
                </template>
            </Column>
            <Column field="Nombre_Empleado" header="NOMBRE" style="white-space:nowrap"></Column>
            <Column field="Apellido_Empleado" header="APELLIDO" style="white-space:nowrap"></Column>
            <Column field="Usuario" header="USUARIO"></Column>
            <Column field="Correo_Empleado" header="CORREO"></Column>
            <Column field="CI_Empleado" header="CI" class="text-right"></Column>
            <Column field="Celular_Empleado" header="CELULAR" class="text-right"></Column>
            <Column header="ROL">
                <template #body="slotProps">
                    <span v-if="slotProps.data.Estado_Login == 1"> ADMINISTRADOR </span>
                    <span v-else-if="slotProps.data.Estado_Login == 2"> CAJERO </span>
                    <span v-else> DE BAJA </span>
                </template>
            </Column>
            <Column header="ESTADO">
                <template #body="slotProps">
                    <span v-if="slotProps.data.Estado_Empleado" style="color: darkgreen"> <b> Activo </b> </span>
                    <span v-else style="color: crimson"> <b> Inactivo </b> </span>
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem; white-space:nowrap" header="ACCIONES">
                <template #body="slotProps">
                    <ModalEditar v-on:listar="listar" :usuario="slotProps.data"></ModalEditar>
                    <ModalPassword v-on:listar="listar" :usuario="slotProps.data"></ModalPassword>
                    <!--<Button v-tooltip.top="'Cambiar Contraseña'" icon="pi pi-sync"
                        class="p-button-rounded p-button-info mr-2">
                    </Button>
                    <Button v-tooltip.top="'Dar de Baja'" icon="pi pi-stop-circle"
                        class="p-button-rounded p-button-warning mr-2">
                    </Button>-->
                    <Button v-if="slotProps.data.Estado_Empleado" v-tooltip.top="'Desactivar'" icon="pi pi-lock" 
                        class="p-button-rounded p-button-danger mr-2" @click="confirmar(slotProps.data)">
                    </Button>
                    <Button v-else icon="pi pi-lock-open" v-tooltip.top="'Activar'" class="p-button-rounded p-button-primary" @click="confirmar(slotProps.data)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import ModalPassword from "@/components/usuario/ModalPassword.vue"
import ModalEditar from "@/components/usuario/ModalEditar.vue"
import ModalNuevo from "@/components/usuario/ModalNuevo.vue"
import * as usuario from "@/services/usuario.service"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"
import moment from 'moment'

export default {
    components: {
        ModalPassword,
        ModalNuevo,
        ModalEditar
    },

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
        const arrayUsuario = ref()
        const datosUsuario = ref({
            id: 0,
            estado: ''
        })

        const confirmar = (usuario) => {
            let headers = usuario.Estado_Empleado == 1 ? 'Desactivar empleado' : 'Activar empleado'
            let icons   = usuario.Estado_Empleado == 1 ? 'pi pi-info-circle' : 'pi pi-exclamation-triangle'
            let button  = usuario.Estado_Empleado == 1 ? 'p-button-danger' : 'p-button-primary'
            let detalle = usuario.Estado_Empleado == 1 ? 'Empleado desactivado' : 'Empleado activado'
            datosUsuario.value.id     = usuario.ID_Empleado
            datosUsuario.value.estado = usuario.Estado_Empleado

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
            listar()
        })

        const formatDate = (value) => {
            if(value)
				return moment(value).format("DD-MM-YY")
			return;
        }
        function listar(){
            usuario.listar(lazyParams.value, filters.value)
            .then(res => {
                loading.value = true
                setTimeout(() => {
                    arrayUsuario.value = res.data.data
                    totalRecords.value  = res.data.total
                    loading.value = false
                }, 2000)
            });
        }
        function eliminar(){
            usuario.eliminar(datosUsuario.value)
            .then(res => {
                listar()
            });
        }

        return{
            dt,
            onPage,
            loading,
            filters,
            totalRecords,
            formatDate,

            listar,
            confirmar,
            arrayUsuario
        }
    }
}
</script>