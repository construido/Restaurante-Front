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
                label: 'Lista de Compras',
                icon: 'pi pi-fw pi-list',
                to: '/compra'
            },
            {
                label: 'Nueva Compra',
                icon: 'pi pi-fw pi-external-link',
                to: '/compra/nuevo'
            }
        ])

        return{
            items
        }
    }
}
</script>