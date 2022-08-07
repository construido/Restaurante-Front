<template>
  <div class="card">

    <Toast/>

    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nueva Categoria" icon="pi pi-external-link" @click="abrirModal"></Button>
        </template>
    </Toolbar>

    <Dialog :header="header" v-model:visible="categoriaModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <div v-if="elim == true" class="p-fluid grid p-4">
            <h1>{{message}}</h1>
        </div>
        <div v-else class="p-fluid grid p-4">
            <div class="field col-12 md:col-12">
                <span class="p-float-label">
                    <InputText id="inputtext" type="text" v-model="datosCategoria.nombre"/>
                    <label for="inputtext" autofocus>Nombre</label>
                </span>
            </div>

            <div class="field col-12 md:col-12">
                <span class="p-float-label">
                    <Textarea id="textarea" v-model="datosCategoria.descripcion" rows="3"></Textarea>
                    <label for="textarea">Descripción</label>
                </span>
            </div>
        </div>

        <template #footer>
            <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" class="p-button-danger p-button-text"></Button>
            <template v-if="elim == true">
                <Button label="Aceptar" icon="pi pi-check" class="p-button-warning p-button-text" @click="eliminar"></Button>
            </template>
            <template v-else>
                <Button v-if="edit == true" label="Actualizar" class="p-button-success p-button-text" icon="pi pi-check" @click="editar"></Button>
                <Button v-else label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="guardar"></Button>
            </template>
        </template>
    </Dialog>

    <DataTable :value="arrayCategoria" responsiveLayout="scroll">
        <Column field="ID_Categoria" header="#" class="text-right"></Column>
        <Column field="Nombre_Categoria" header="NOMBRE"></Column>
        <Column field="Descripcion_Categoria" header="DESCRIPCIÓN"></Column>
        <Column header="ESTADO">
            <template #body="slotProps">
                <span v-if="slotProps.data.Estado_Categoria" style="color: darkgreen"> <b> Activo </b> </span>
                <span v-else style="color: crimson"> <b> Inactivo </b> </span>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem" header="ACCIONES">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-success mr-2" @click="cargarEdit(slotProps.data)"></Button>
                <Button v-if="slotProps.data.Estado_Categoria" title="Desactivar" icon="pi pi-lock" class="p-button-rounded p-button-danger mr-2" @click="cargarDelete(slotProps.data)"></Button>
                <Button v-else icon="pi pi-lock-open" title="Activar" class="p-button-rounded p-button-primary" @click="cargarDelete(slotProps.data)"></Button>
            </template>
        </Column>
    </DataTable>

  </div>
</template>

<script>
import * as categoria from "@/services/categoria.service"
import { useToast } from "primevue/usetoast"
import { ref, onMounted } from "vue"

export default {
    setup(){
        // variables
        var message = ref('')
        var elim = ref(false)
        var edit = ref(false)
        var header = ref('Nueva Categoria')
        const toast = useToast()
        const datosCategoria = ref({
            id:'',
            nombre: '',
            descripcion: '',
            estado: 0
        })
        const arrayCategoria = ref()
        const categoriaModal = ref(false)

        const abrirModal = () => {
            categoriaModal.value = true;
        }
        const cerrarModal = () => {
            limpiarCampos()
            categoriaModal.value = false;
        }

        // funcion que se activa al ingresar a la página - load
        onMounted(() => {
            listar()
        })

        // funciones
        function toastSuccess(){
            toast.add({severity: 'success', summary: 'Categoria Registrada', detail: 'Registrado Correctamente', life: 3000})
        }
        function toastEdit(){
            toast.add({severity: 'info', summary: 'Categoria Actualizada', detail: 'Actualizado Correctamente', life: 3000})
        }
        function toastDelete(){
            toast.add({severity: 'warn', summary: 'Estado Actualizado', detail: 'Actualizado Correctamente', life: 3000})
        }
        function limpiarCampos(){
            edit.value = false
            elim.value = false
            header.value = 'Nueva Categoria'
            datosCategoria.value.id = ''
            datosCategoria.value.nombre = ''
            datosCategoria.value.descripcion = ''
            datosCategoria.value.estado = 0
        }
        function listar(){
            categoria.listar()
            .then(res => {
                arrayCategoria.value = res.data
            });
        }
        function guardar(){
            categoria.guardar(datosCategoria.value)
            .then(res => {
                listar()
                cerrarModal()
                toastSuccess()
            });
        }
        function cargarEdit(categoria){
            edit.value = true
            header.value = 'Actualizar Categoria'
            datosCategoria.value.id = categoria.ID_Categoria
            datosCategoria.value.nombre = categoria.Nombre_Categoria
            datosCategoria.value.descripcion = categoria.Descripcion_Categoria
            abrirModal()
        }
        function editar(){
            categoria.editar(datosCategoria.value)
            .then(res => {
                listar()
                toastEdit()
                cerrarModal()
            });
        }
        function cargarDelete(categoria){
            console.log(categoria.Estado_Categoria)
            elim.value = true
            header.value = 'Estado Categoria'
            
            if(categoria.Estado_Categoria == 1) message.value = 'Desea desactivar esta Categoría ?'
            else message.value = 'Desea activar esta Categoría ?'

            datosCategoria.value.id = categoria.ID_Categoria
            datosCategoria.value.estado = categoria.Estado_Categoria
            abrirModal()
        }
        function eliminar(){
            categoria.eliminar(datosCategoria.value)
            .then(res => {
                listar()
                toastDelete()
                cerrarModal()
            });
        }

        // variables y funciones que retornan un valor y se utilizan en el template
        return {
            abrirModal,
            cerrarModal,
            categoriaModal,

            edit,
            elim,
            header,
            message,
            cargarEdit,
            cargarDelete,

            editar,
            guardar,
            eliminar,
            datosCategoria,
            arrayCategoria
        }
    }
}
</script>