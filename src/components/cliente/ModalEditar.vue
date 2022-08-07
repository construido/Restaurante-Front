<template>

    <Toast/>

    <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-success mr-2" @click="abrirModal"></Button>

    <Dialog header="Actualizar Cliente" v-model:visible="categoriaModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
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
            <Button label="Cerrar" icon="pi pi-times" class="p-button-danger p-button-text" @click="cerrarModal" ></Button>
            <Button label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="eliminar"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as cliente from "@/services/cliente.service"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: 'ModalEditar',
    emits: ["listar"],

    props: {
        cliente: { type: Object }
    },
    
    setup(props, { emit }){
        const toast = useToast()
        const datosCliente = ref({
            id:       props.cliente.ID_Cliente,
            ci_nit:   props.cliente.CI_NIT_Cliente,
            correo:   props.cliente.Correo_Cliente,
            telefono: props.cliente.Telefono_Cliente,
            nombre:   props.cliente.Nombre_Razon_Social_Cliente
        })

        const categoriaModal = ref(false)
        const abrirModal = () => {
            categoriaModal.value = true;
        }
        const cerrarModal = () => {
            limpiar()
            categoriaModal.value = false;
        }
        function toastSuccess(){
            toast.add({severity: 'success', summary: 'Cliente Registrado', detail: 'Registrado Correctamente', life: 3000})
        }

        function limpiar(){
            datosCliente.value.nombre = ''
            datosCliente.value.ci_nit = ''
            datosCliente.value.correo = ''
            datosCliente.value.telefono = ''
        }
        function eliminar(){
            cliente.editar(datosCliente.value)
            .then(res => {
                toastSuccess()
                cerrarModal()
                emit("listar")
            })
        }
        return {
            eliminar,

            datosCliente,

            abrirModal,
            cerrarModal,
            categoriaModal
            
        }
    }
}
</script>
