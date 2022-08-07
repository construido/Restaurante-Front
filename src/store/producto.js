import { createStore } from 'vuex'

export default createStore({
  state: {
    // TODO: variables para la tabla producto
    id: 0,
    venta: 0,
    stock: 0,
    nombre: '',
    compra: 0,
    salida: 0,
    ingreso: 0,
    categoria: '',
    descripcion: '',
  },

  getters: {
  },

  mutations: {
    // para la primera y segunda forma de utilizar los estado de vuex
    cargarDatos(state, producto){
      state.id          = producto.ID_Producto
      state.venta       = producto.Precio_Venta_P
      state.stock       = producto.Stock
      state.nombre      = producto.Nombre_Producto
      state.compra      = producto.Precio_Compra_P
      state.salida      = producto.Salida_Producto
      state.ingreso     = producto.Ingreso_Producto
      state.categoria   = producto.ID_Categoria
      state.descripcion = producto.Descripcion_Producto
    }
  },

  actions: {
    // para la tercera forma de utilizar los estado de vuex
    cargarProducto(context, producto){
      context.commit("cargarDatos", producto);
    }
  },
  
  modules: {
  }
})
