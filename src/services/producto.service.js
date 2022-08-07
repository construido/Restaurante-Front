import { http } from './http.js'

export function listar() {
    return http().get('verify/listarProductos')
}

export function guardar(producto) {
    return http().post('verify/guardarProducto', {
        'Venta': producto.venta,
        'Stock': producto.stock,
        'Compra': producto.compra,
        'Salida': producto.salida,
        'Nombre': producto.nombre,
        'Minimo': producto.minimo,
        'Ingreso': producto.ingreso,
        'Categoria': producto.categoria,
        'Descripcion': producto.descripcion,
    })
}

export function editar(producto) {
    return http().put('verify/actualizarProducto', {
        'ID': producto.id,
        'Venta': producto.venta,
        'Stock': producto.stock,
        'Compra': producto.compra,
        'Salida': producto.salida,
        'Nombre': producto.nombre,
        'Minimo': producto.minimo,
        'Ingreso': producto.ingreso,
        'Categoria': producto.categoria,
        'Descripcion': producto.descripcion
    })
}

export function eliminar(producto) {
    return http().put('verify/actualizarEstadoProducto', {
        'ID': producto.id,
        'Estado': producto.estado,
    })
}