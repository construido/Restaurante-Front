<template>

    <Toast/>

    <Button v-tooltip.top="'Cambiar Contraseña'" icon="pi pi-sync" class="p-button-rounded p-button-info mr-2" @click="abrirModal"></Button>

    <Dialog header="Cambiar Contraseña" v-model:visible="usuarioModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="password" :type="type" v-model="datosUsuario.password"/>
                    <label for="password" autofocus>Nueva Contraseña</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="rep_password" :type="type" v-model="datosUsuario.rep_password"/>
                    <label for="rep_password" autofocus>Confirmar Contraseña</label>
                </span>
            </div>
            <input type="checkbox" @click="mostrarPass"/> <label class="ml-2" v-text="textLabel"></label>
        </div>

        <template #footer>
            <Button label="Cerrar" icon="pi pi-times" @click="cerrarModal" class="p-button-danger p-button-text"></Button>
            <Button label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="cambiarPass()"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as usuario from "@/services/usuario.service"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: "ModalNuevo",
    emits: ["listar"],

    props: {
        usuario: { type: Object }
    },

    setup(props, { emit }){
        const checked = ref(false)
        const type = ref('password')
        const textLabel = ref('Mostrar Contraseña')
        const toast = useToast()
        const datosUsuario = ref({
            id: props.usuario.ID_Empleado,
            id_login: props.usuario.ID_Login
        })
        const usuarioModal = ref(false)
        const abrirModal = () => {
            usuarioModal.value = true;
        }
        const cerrarModal = () => {
            datosUsuario.value.password = ''
            datosUsuario.value.rep_password = ''
            usuarioModal.value = false;
        }
        function toastMessage(color, header, message){
            toast.add({severity: color, summary: header, detail: message, life: 3000})
        }
        function cambiarPass(){
            if (datosUsuario.value.password == datosUsuario.value.rep_password){
                usuario.cambiarPass(datosUsuario.value)
                .then(res => {
                    if(res == 422){
                        toastMessage('error', 'Error', 'Debe llenar todos los campos')
                    }else{
                        toastMessage('success', 'Éxito', 'Guardado Correctamente')
                        setTimeout(() => {
                            cerrarModal()
                            emit("listar")
                        }, 2000)
                    }
                })
            }else{
                toastMessage('error', 'Error', 'Los campos no coninciden')
            }
        }
        function mostrarPass(){
            checked.value = !checked.value
            type.value = type.value == 'password' ? 'text' : 'password'
            textLabel.value = textLabel.value == 'Mostrar Contraseña' ? 'Ocultar Contraseña' : 'Mostrar Contraseña'
        }

        return {
            type,
            checked,
            textLabel,
            mostrarPass,
            cambiarPass,

            abrirModal,
            cerrarModal,
            usuarioModal,

            datosUsuario
        }
    }
}
</script>