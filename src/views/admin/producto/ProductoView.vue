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
                label: 'Lista',
                icon: 'pi pi-fw pi-list',
                to: '/producto'
            },
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-external-link',
                to: '/producto/nuevo'
            },
            {
                label: 'Editar',
                icon: 'pi pi-fw pi-pencil',
                to: '/producto/editar'
            }
        ]);

        return{
            items
        }
    }
}
</script>