<template>
    <div class="card">
        <h1>Contador</h1>

        <h2> {{ $store.state.contador }} </h2>
        <button @click="incrementar"> + </button> |
        <button @click="$store.commit('restar')"> - </button> <br> <!-- primera manera de utilizar los estados de vuex -->

    </div>
</template>

<script>
export default {
    methods: {
        incrementar(){
            // this.$store.commit('sumar') // segunda manera de utilizar los estados de vuex
            this.$store.dispatch('sumarContador') // tercera manera de utilizar los estados de vuex
        }
    }
}
</script>
