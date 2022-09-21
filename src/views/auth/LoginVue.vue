<template>

    <Toast/>

    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-6 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="../../../public/images/shop.png" alt="Image" height="200" class="mb-2">
                        <div class="text-900 text-3xl font-medium mb-2">¡BIENVENIDO!</div>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="Usuario" class="block text-900 text-xl font-medium">Usuario</label>
                        <InputText id="Usuario" v-model="credenciales.Usuario" type="text" class="w-full mb-3" placeholder="Usuario" style="padding:1rem;"/>
                
                        <label for="password1" class="block text-900 font-medium text-xl">Password</label>
                        <InputText id="password1" v-model="credenciales.password" type="password" class="w-full mb-3" placeholder="password" style="padding:1rem;"/>
 
                        <Button label="INGRESAR" class="w-full p-3 text-xl" @click="login()"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as authService from "@/services/auth.service"
import { useToast } from "primevue/usetoast"
import router from "@/router"
import { ref } from "vue"

export default {
    setup(){
        const credenciales = ref({})
        const toast = useToast()

        function toastMessage(message){
            toast.add({severity: 'error', summary: 'ERROR', detail: message, life: 3000})
        }
        function login(){
            authService.login(credenciales.value)
            .then(res => {
                if (res == 422){
                    toastMessage('Debe llenar todos los campos')
                }else{
                    if(res == 401){
                        toastMessage('Credenciales inválidos')
                    }else{
                        if(res == 403){
                            toastMessage('Usuario suspendido')
                        }else{
                            localStorage.setItem('token', res.data.token.token)
                            localStorage.setItem('estado', res.data.data.Estado_Login)
                            router.push('/')
                        }
                    }
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }

        return {
            login,

            credenciales
        }
    }
}
</script>
