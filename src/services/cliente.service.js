import { http } from './http.js'

export function listar() {
    return http().get('verify/listarClientes')
}

export function listarSelect() {
    return http().get('verify/listarSelectCliente')
}

export function guardar(cliente) {
    return http().post('verify/guardarCliente', {
        'Nombre': cliente.nombre,
        'CI_NIT': cliente.ci_nit,
        'Correo': cliente.correo,
        'Telefono': cliente.telefono,
    })
}

export function editar(cliente) {
    return http().put('verify/actualizarCliente', {
        'ID': cliente.id,
        'Nombre': cliente.nombre,
        'CI_NIT': cliente.ci_nit,
        'Correo': cliente.correo,
        'Telefono': cliente.telefono,
    })
}

export function eliminar(cliente) {
    return http().put('verify/actualizarEstadoCliente', {
        'ID': cliente.id,
        'Estado': cliente.estado,
    })
}