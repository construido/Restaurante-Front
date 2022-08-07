import TriStateCheckbox from 'primevue/tristatecheckbox';
import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 0,
    usuario : null,
    password : null,

    // TODO: variables para la tabla producto
    id: 0,
    venta: 0,
    stock: 0,
    nombre: '',
    minimo: 0,
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
    sumar(state){
      state.contador = state.contador + 1;
    },
    restar(state){
      state.contador = state.contador - 1;
    },
    login(state, datos_usuario){
      state.usuario = datos_usuario.data.Usuario
      state.password = datos_usuario.data.Contrasena
    },

    // TODO: mutación para la tabla producto
    cargarDatos(state, producto){
      state.id          = producto.ID_Producto
      state.venta       = producto.Precio_Venta_P
      state.stock       = producto.Stock
      state.nombre      = producto.Nombre_Producto
      state.minimo      = producto.Stock_Minimo
      state.compra      = producto.Precio_Compra_P
      state.salida      = producto.Salida_Producto
      state.ingreso     = producto.Ingreso_Producto
      state.categoria   = producto.ID_Categoria
      state.descripcion = producto.Descripcion_Producto
    },
    limpiarDatos(state){
      state.id          = 0
      state.venta       = 0
      state.stock       = 0
      state.nombre      = ''
      state.minimo      = 0
      state.compra      = 0
      state.salida      = 0
      state.ingreso     = 0
      state.categoria   = ''
      state.descripcion = ''
    }
  },
  actions: {
    // para la tercera forma de utilizar los estado de vuex
    sumarContador(context){
      context.commit("sumar");
    },
    ingresarVuex(context, datos_usuario){
      context.commit("login", datos_usuario);
    },

    // TODO: acción para la tabla producto
    cargarProducto(context, producto){
      context.commit("cargarDatos", producto);
    },
    limpiarProducto(context){
      context.commit("limpiarDatos");
    }
  },
  modules: {
  }
})
