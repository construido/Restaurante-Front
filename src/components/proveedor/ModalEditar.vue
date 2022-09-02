<template>

    <Toast/>

    <Button icon="pi pi-pencil" title="Editar" class="p-button-rounded p-button-success mr-2" @click="abrirModal"></Button>

    <Dialog header="Actualizar Cliente" v-model:visible="proveedorModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="nombre" type="text" v-model="datosProveedor.nombre"/>
                    <label for="nombre" autofocus>Nombre o Razón Social</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="ci_nit" type="number" v-model="datosProveedor.ci_nit"/>
                    <label for="ci_nit" autofocus>CI / NIT</label>
                </span>
            </div>
        </div>

        <div class="p-fluid grid p-4">
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="telefono" type="number" v-model="datosProveedor.telefono"/>
                    <label for="telefono" autofocus>Telefono</label>
                </span>
            </div>
            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="correo" type="text" v-model="datosProveedor.correo"/>
                    <label for="correo" autofocus>Correo</label>
                </span>
            </div>
        </div>

        <template #footer>
            <Button label="Cerrar" icon="pi pi-times" class="p-button-danger p-button-text" @click="cerrarModal" ></Button>
            <Button label="Guardar" icon="pi pi-check" class="p-button-primary p-button-text" @click="editar"></Button>
        </template>
    </Dialog>
</template>

<script>
import * as proveedor from "@/services/proveedor.service"
import { useToast } from "primevue/usetoast"
import { ref } from "vue"

export default {
    name: 'ModalEditar',
    emits: ["listar"],

    props: {
        proveedor: { type: Object }
    },
    
    setup(props, { emit }){
        const toast = useToast()
        const datosProveedor = ref({
            id:       props.proveedor.ID_Proveedor,
            ci_nit:   props.proveedor.CI_NIT_Proveedor,
            correo:   props.proveedor.Correo_Proveedor,
            telefono: props.proveedor.Telefono_Proveedor,
            nombre:   props.proveedor.Nombre_Razon_Social_Proveedor
        })

        const proveedorModal = ref(false)
        const abrirModal = () => {
            proveedorModal.value = true;
        }
        const cerrarModal = () => {
            proveedorModal.value = false;
        }
        function toastMessage(color, header, message){
            toast.add({severity: color, summary: header, detail: message, life: 3000})
        }

        function editar(){
            proveedor.editar(datosProveedor.value)
            .then(res => {
                if(res == 422){
                    toastMessage('error', 'Error', 'Campos vacíos o correo no válido')
                }else{
                    toastMessage('success', 'Éxito', 'Actualizado Correctamente')
                    setTimeout(() => {
                        cerrarModal()
                        emit("listar")
                    }, 2000)
                }
            })
        }
        return {
            editar,

            datosProveedor,

            abrirModal,
            cerrarModal,
            proveedorModal
        }
    }
}
</script>
