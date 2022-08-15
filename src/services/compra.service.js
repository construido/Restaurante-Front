import { http } from './http.js'

export function listar() {
    return http().get('verify/listarCompras')
}

export function listarDetalle(compra) {
    return http().get('verify/listarDetalleCompra?Compra='+compra)
}

export function guardar(proveedor, detalle, total) {
    return http().post('verify/guardarCompra', {
        'Proveedor': proveedor.ID_Proveedor,
        'Total': total,
        'Productos': detalle
    })
}