<template>
    <div class="card">
        <TabMenu :model="items" />
        <router-view/>
    </div>
</template>

<script>
import { ref } from "vue"

export default {
    setup(){
        const items = ref([
            {
                label: 'Lista de Ventas',
                icon: 'pi pi-fw pi-list',
                to: '/venta'
            },
            {
                label: 'Nueva Venta',
                icon: 'pi pi-fw pi-external-link',
                to: '/venta/nuevo'
            }
        ])

        return{
            items
        }
    }
}
</script>