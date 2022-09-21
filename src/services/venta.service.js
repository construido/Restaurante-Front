import { http } from './http.js'

export function listar(params) {
    return http().get('verify/listarVentas?page=' + (params.page + 1) + '&rows=' + params.rows)
}

export function listarDetalle(venta) {
    return http().get('verify/listarDetalleVenta?Venta='+venta)
}

export function guardar(cliente, detalle, total) {
    return http().post('verify/guardarVenta', {
        'Total': total,
        'Cliente': cliente,
        'Productos': detalle
    })
}

export function PDF($venta) {
    return http().get('verify/imprimirVenta?Venta=' + $venta, {responseType: 'blob'})
}