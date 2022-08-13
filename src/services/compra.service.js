import { http } from './http.js'

export function listar() {
    return http().get('verify/listarCompras')
}

export function listarDetalle(compra) {
    return http().get('verify/listarDetalleCompra?Compra='+compra)
}
