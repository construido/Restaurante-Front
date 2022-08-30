<template>

    <!--<img src="../../../../public/images/default.png" alt="Image" class="my-4"  width="250" preview>
    <img src="http://192.168.100.2:8000/default.png" alt="Image" class="my-4"  width="200" preview>
    <InputText type="file" value=""/>-->

    <Toast/>

    <div class="p-fluid grid my-4">
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputText id="producto" type="text" v-model="datosProducto.nombre"/>
                <label for="producto">Producto</label>
            </span>
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber id="compra" type="text" mode="currency" currency="BOB" locale="es-BO" v-model="datosProducto.compra"/>
                <label for="compra">Precio Compra</label>
            </span>
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber id="venta" type="text" mode="currency" currency="BOB" locale="es-BO" v-model="datosProducto.venta"/>
                <label for="venta">Precio Venta</label>
            </span>
        </div>
    </div>

    <div class="p-fluid grid">
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber id="ingreso" type="text" v-model="datosProducto.ingreso"/>
                <label for="ingreso">Ingreso</label>
            </span>
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber id="minimo" v-model="datosProducto.minimo"/>
                <label for="minimo">Stock Mínimo</label>
            </span>
        </div>
        <div  class="field col-12 md:col-4">
            <span class="p-float-label">
                <Dropdown v-model="datosProducto.categoria" optionValue="ID_Categoria" :options="arrayCategoriaSelect" optionLabel="Nombre_Categoria"/>
                <label for="textarea">Categoria</label>
            </span>
        </div>
    </div>

    <div class="p-fluid grid my-2">
        <div class="field col-12 md:col-8">
            <span class="p-float-label">
                <Textarea id="textarea" rows="5" v-model="datosProducto.descripcion"></Textarea>
                <label for="textarea">Descripción</label>
            </span>
        </div>
        <!--<div class="field col-12 md:col-4">
            <label for="imagen">Imagen</label>
            <FileUpload mode="basic" accept="image/*" chooseLabel="Subir Imagen"/>
            <input type="file"/>
            <InputText type="file" value=""/>
        </div>-->
    </div>

    <Button label="Cerrar" icon="pi pi-times" class="p-button-danger p-button-text" @click="$router.go(-1)" title="Cerrar"></Button>
    <Button label="Guardar" icon="pi pi-folder" class="p-button-primary p-button-text" @click="guardar" title="Guardar"></Button>
</template>

<script>
import store from '@/store'
import router from "@/router"
import { ref, onMounted } from "vue"
import { useToast } from "primevue/usetoast"
import * as producto from "@/services/producto.service"
import * as categoria from "@/services/categoria.service"

export default {
    setup(){
        const toast = useToast()
        const arrayCategoriaSelect = ref()
        const datosProducto = ref({
            venta: 0,
            nombre: '',
            minimo: 0,
            compra: 0,
            ingreso: 0,
            categoria: '',
            descripcion: '',
        })

        onMounted(() => {
            store.dispatch('limpiarProducto')
            listar()
        })

        function toastSuccess(){
            toast.add({severity: 'success', summary: 'Producto Registrado', detail: 'Registrado Correctamente', life: 3000})
        }
        function guardar(){
            producto.guardar(datosProducto.value)
            .then(res => {
                toastSuccess()
                setTimeout(() => {
                    router.push('/producto')
                }, 3000)
            })
        }
        function listar(){
            categoria.listarSelect()
            .then(res => {
                arrayCategoriaSelect.value = res.data
            });
        }

        return{
            guardar,

            toast,

            datosProducto,
            arrayCategoriaSelect
        }
    }

}
</script>
