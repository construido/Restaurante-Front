import { http } from './http.js'

export function listarProductos() {
    return http().post('verify/cantidadProductos')
}

export function listarClientes() {
    return http().post('verify/cantidadClientes')
}

export function listarCompras() {
    return http().post('verify/cantidadCompras')
}

export function listarVentas() {
    return http().post('verify/cantidadVentas')
}

export function porcentajeProductos() {
    return http().post('verify/porcentajeProductos')
}

export function productoStock() {
    return http().post('verify/productoStock')
}