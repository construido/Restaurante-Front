import { http } from './http.js'

export function listar(params) {
    return http().get('verify/listarCompras?page=' + (params.page + 1) + '&rows=' + params.rows)
}

export function listarDetalle(compra) {
    return http().get('verify/listarDetalleCompra?Compra='+compra)
}

export function guardar(proveedor, detalle, total) {
    return http().post('verify/guardarCompra', {
        'Total': total,
        'Productos': detalle,
        'Proveedor': proveedor,
    })
}