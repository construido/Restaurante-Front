import { http } from './http.js'

export function listar() {
    return http().get('verify/listarProveedores')
}

export function listarSelect() {
    return http().get('verify/listarSelectProveedor')
}

export function guardar(proveedor) {
    return http().post('verify/guardarProveedor', {
        'Nombre': proveedor.nombre,
        'CI_NIT': proveedor.ci_nit,
        'Correo': proveedor.correo,
        'Telefono': proveedor.telefono,
    })
}

export function editar(proveedor) {
    return http().put('verify/actualizarProveedor', {
        'ID': proveedor.id,
        'Nombre': proveedor.nombre,
        'CI_NIT': proveedor.ci_nit,
        'Correo': proveedor.correo,
        'Telefono': proveedor.telefono,
    })
}

export function eliminar(proveedor) {
    return http().put('verify/actualizarEstadoProveedor', {
        'ID': proveedor.id,
        'Estado': proveedor.estado,
    })
}