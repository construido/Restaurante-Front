<template>

    <Toast/>

    <Button label="Nuevo Usuario" icon="pi pi-external-link" @click="abrirModal"></Button>

    <Dialog header="Nuevo Usuario" v-model:visible="usuarioModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="nombre" type="text" v-model="datosUsuario.nombre" style="text-transform: uppercase"/>
                    <label for="nombre" autofocus>Nombre</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="apellido" type="text" v-model="datosUsuario.apellido" style="text-transform: uppercase"/>
                    <label for="apellido" autofocus>Apellido</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="correo" type="text" v-model="datosUsuario.correo" style="text-transform: uppercase"/>
                    <label for="correo" autofocus>Correo</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="ci" type="number" v-model="datosUsuario.ci"/>
                    <label for="ci" autofocus>CI</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="celular" type="number" v-model="datosUsuario.celular"/>
                    <label for="celular" autofocus>Celular</label>
                </span>
            </div>
            <div  class="field col-12 md:col-6">
                <span class="p-float-label">
                    <Dropdown v-model="datosUsuario.rol" optionValue="code" :options="arrayRol" optionLabel="label"/>
                    <label for="textarea">ROL</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="user" type="text" v-model="datosUsuario.user" style="text-transform: uppercase"/>
                    <label for="user" autofocus>Usuario</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="password" type="password" v-model="datosUsuario.password"/>
                    <label for="password" autofocus>Contraseña</label>
                </span>
            </div>
        </div>

        <template #footer>
            <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" class="p-button-danger p-button-text"></Button>
            <Button label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="guardar"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as usuario from "@/services/usuario.service"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: "ModalNuevo",

    props: {
        listar: { type: Function }
    },

    setup(props){
        const arrayRol = ref([
            { label: 'Administrador', code: 1},
            { label: 'Cajero', code: 2}
        ])
        const toast = useToast()
        const datosUsuario = ref({})
        const usuarioModal = ref(false)
        const abrirModal = () => {
            usuarioModal.value = true;
        }
        const cerrarModal = () => {
            limpiar()
            usuarioModal.value = false;
        }
        function toastMessage(color, header, message){
            toast.add({severity: color, summary: header, detail: message, life: 3000})
        }

        function limpiar(){
            datosUsuario.value = {}
        }
        function guardar(){
            usuario.guardar(datosUsuario.value)
            .then(res => {
                if(res == 422){
                    toastMessage('error', 'Error', 'Debe llenar todos los campos')
                }else{
                    toastMessage('success', 'Éxito', 'Guardado Correctamente')
                    setTimeout(() => {
                        cerrarModal()
                        datosUsuario.value = {} //limpiar()
                        props.listar()
                    }, 2000)
                }
            })
        }

        return {
            guardar,
            arrayRol,

            abrirModal,
            cerrarModal,
            usuarioModal,

            datosUsuario
        }
    }
}
</script>