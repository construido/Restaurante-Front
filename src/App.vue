<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <!--<AppFooter />-->
        </div>

		<!--<AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>-->
	</div>

</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';

export default {
    emits: ['change-theme'],
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Home',
                    items: [{
                        label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/'
                    }]
                },
				{
					label: 'Registro', icon: 'pi pi-fw pi-sitemap',
					items: [
						{label: 'Venta', icon: 'pi pi-fw pi-wallet', to: '/venta'},
                        {label: 'Compra', icon: 'pi pi-fw pi-money-bill', to: '/compra'},
                        {label: 'Cliente', icon: 'pi pi-fw pi-users', to: '/cliente'},
						{label: 'Producto', icon: 'pi pi-fw pi-shopping-cart', to: '/producto'},
                        {label: 'Categoria', icon: 'pi pi-fw pi-tags', to: '/categoria'},
                        {label: 'Proveedor', icon: 'pi pi-fw pi-shopping-bag', to: '/proveedor'},
					]
				},
                {
                    label: 'Mantenimiento', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Caja', icon: 'pi pi-fw pi-inbox',
                            items: [
                                {label: 'Nuevo', icon: 'pi pi-fw pi-plus-circle', to: '/caja'},
                                {label: 'Salida', icon: 'pi pi-fw pi-upload'},
                                {label: 'Entrada', icon: 'pi pi-fw pi-download'},
                            ]
                        },
                        {
                            label: 'Inventario', icon: 'pi pi-fw pi-book',
                            items: [
                                {label: 'Salida', icon: 'pi pi-fw pi-upload'},
                                {label: 'Entrada', icon: 'pi pi-fw pi-download'},
                            ]
                        },
                        {
                            label: 'Descarga', icon: 'pi pi-fw pi-cloud-download',
                            items: [
                                {label: 'Cliente', icon: 'pi pi-fw pi-users'},
                                {label: 'Inventario', icon: 'pi pi-fw pi-book'},
                            ]
                        },
                    ]
                },
                /*{
                    label: 'Información', 
                    items: [
                        {label: 'About', icon: 'pi pi-fw pi-info-circle', to: '/about'},
                        {label: 'Home', icon: 'pi pi-fw pi-home', to: '/home'},
                    ]
                }*/
            ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
