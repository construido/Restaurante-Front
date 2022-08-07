<template>

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

export default {
    data(){
        return {
            credenciales: {
                Usuario: null,
                password: null
            }
        }
    },

    methods: {
        async login(){
            try {
                const { data } = await authService.login(this.credenciales)
                localStorage.setItem('token', data.token.token)
                this.$router.push('/')
            } catch (error) {
                console.log("******************* vista: ", error.message)
            }
        }
    },

    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }
}
</script>
