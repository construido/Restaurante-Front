import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import moment from 'moment';
import App from './../App.vue';

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
      },
      {
        path: '/categoria',
        name: 'categoria',
        component: () => import(/* webpackChunkName: "categoria" */ '../views/admin/categoria/CategoriaView.vue')
      },
      {
        path: '/producto',
        name: 'producto',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/producto/ProductoView.vue'),
        children: [
          {
            path: '/producto',
            name: 'lista',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/producto/ProductoListaView.vue')
          },
          {
            path: '/producto/nuevo',
            name: 'nuevo',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/producto/ProductoNuevoView.vue')
          },
          {
            path: '/producto/editar',
            name: 'editar',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/producto/ProductoEditarView.vue')
          },
        ]
      },
      {
        path: '/compra',
        name: 'compra',
        component: () => import(/* webpackChunkName: "compra" */ '../views/admin/compra/CompraView.vue'),
        children: [
          {
            path: '/compra',
            name: 'listar',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/compra/CompraListaView.vue')
          },
          {
            path: '/compra/nuevo',
            name: 'nueva',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/compra/CompraNuevaView.vue')
          }
        ]
      },
      {
        path: '/venta',
        name: 'venta',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/venta/VentaView.vue'),
        children: [
          {
            path: '/venta',
            name: 'listarVenta',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/venta/VentaListaView.vue')
          },
          {
            path: '/venta/nuevo',
            name: 'nuevaVenta',
            component: () => import(/* webpackChunkName: "producto" */ '../views/admin/venta/VentaNuevaView.vue')
          }
        ]
      },
      {
        path: '/cliente',
        name: 'cliente',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/cliente/ClienteView.vue')
      },
      {
        path: '/proveedor',
        name: 'proveedor',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/proveedor/ProveedorView.vue')
      },
      {
        path: '/inventario',
        name: 'inventario',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/inventario/ListaView.vue')
      },
      {
        path: '/entrada',
        name: 'entrada',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/inventario/EntradaView.vue')
      },
      {
        path: '/salida',
        name: 'salida',
        component: () => import(/* webpackChunkName: "producto" */ '../views/admin/inventario/SalidaView.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/caja',
        name: 'caja',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/caja/CajaView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginVue.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function existToken() {
  try {
    if (localStorage.getItem('token')){
      var token     = localStorage.getItem('token')
      var base64Url = token.split('.')[1];
      var base64    = base64Url.replace('-', '+').replace('_', '/');
      var payload   = JSON.parse(window.atob(base64))
      var Fecha_Expiracion = moment(payload.exp * 1000)
      var Fecha_Actual     = new Date();

      if(Fecha_Expiracion._d > Fecha_Actual) return 1; // TODO: Token válido
      else return 0; // TODO: Token expirado

    }else return 0; // TODO: No existe Token
    
  } catch (error) {
    return 0; // TODO: Error de Token
  }
};

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !existToken()) next({ name: 'Login' })
  else next()
})

export default router
