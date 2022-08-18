import { http } from './http.js'

export function listar() {
    return http().get('verify/listarVentas')
}

export function listarDetalle(venta) {
    return http().get('verify/listarDetalleVenta?Venta='+venta)
}

export function guardar(cliente, detalle, total) {
    return http().post('verify/guardarVenta', {
        'Cliente': cliente.ID_Cliente,
        'Total': total,
        'Productos': detalle
    })
}