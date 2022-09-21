<template>

	<Toast/>
	<ConfirmDialog></ConfirmDialog>

	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<!--<img alt="Logo" :src="topbarImage()" />-->
			<img src="../public/images/tienda.png">
			<span>LA MISIONERA</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button" @click="perfil()" title="Perfil">
					<i class="pi pi-user"></i>
					<span>Perfil</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" title="Cerrar Sessión" @click="confirmar()">
					<i class="pi pi-power-off"></i>
					<span>Cerrar Sessión</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import * as authService from "@/services/auth.service"

export default {
    methods: {
		confirmar() {
            this.$confirm.require({
				color: 'red',
                message: 'Estás seguro de continuar?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
                accept: () => {
                    this.$toast.add({severity:'info', summary:'Confirmado', detail:'Cerrando sessión', life: 2000});
					this.logout()
                },
                reject: () => {
					this.$toast.add({severity:'error', summary:'Cancelado', detail:'Cerrar sessión cancelada', life: 2000});
                    this.$confirm.close()
                }
            });
        },
		perfil(){
			this.$router.push('/home')
		},
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		logout(){
			authService.logout();
		}
    },

	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>