<template>

    <Toast/>

    <Button label="Nuevo Cliente" icon="pi pi-external-link" @click="abrirModal"></Button>

    <Dialog header="Nuevo Cliente" v-model:visible="clienteModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="nombre" type="text" v-model="datosCliente.nombre"/>
                    <label for="nombre" autofocus>Nombre o Razón Social</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="ci_nit" type="number" v-model="datosCliente.ci_nit"/>
                    <label for="ci_nit" autofocus>CI / NIT</label>
                </span>
            </div>
        </div>

        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="telefono" type="number" v-model="datosCliente.telefono"/>
                    <label for="telefono" autofocus>Telefono</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="correo" type="text" v-model="datosCliente.correo"/>
                    <label for="correo" autofocus>Correo</label>
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
import * as cliente from "@/services/cliente.service"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: "ModalNuevo",

    props: {
        listar: { type: Function }
    },

    setup(props){
        const toast = useToast()
        const datosCliente = ref({})
        const clienteModal = ref(false)
        const abrirModal = () => {
            clienteModal.value = true;
        }
        const cerrarModal = () => {
            limpiar()
            clienteModal.value = false;
        }
        function toastMessage(color, header, message){
            toast.add({severity: color, summary: header, detail: message, life: 3000})
        }

        function limpiar(){
            datosCliente.value = {}
        }
        function guardar(){
            cliente.guardar(datosCliente.value)
            .then(res => {
                if(res == 422){
                    toastMessage('error', 'Error', 'Debe llenar todos los campos')
                }else{
                    toastMessage('success', 'Éxito', 'Guardado Correctamente')
                    setTimeout(() => {
                        cerrarModal()
                        limpiar()
                        props.listar()
                    }, 2000)
                }
            })
        }

        return {
            guardar,

            abrirModal,
            cerrarModal,
            clienteModal,

            datosCliente
        }
    }
}
</script>