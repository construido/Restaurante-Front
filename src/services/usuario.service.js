import { http } from './http.js'

export function listar(params, filters) {
    return http().get('verify/listarEmpleados?page=' + (params.page + 1) + '&rows=' + params.rows+ '&filters=' + filters)
}

export function guardar(empleado) {
    return http().post('verify/guardarEmpleado', {
        'CI': empleado.ci,
        'Rol': empleado.rol,
        'Nombre': empleado.nombre,
        'Correo': empleado.correo,
        'Celular': empleado.celular,
        'Usuario': empleado.user,
        'Apellido': empleado.apellido,
        'Password': empleado.password,
    })
}

export function editar(empleado) {
    return http().put('verify/actualizarEmpleado', {
        'ID': empleado.id,
        'CI': empleado.ci,
        'Rol': empleado.rol,
        'Login': empleado.id_login,
        'Nombre': empleado.nombre,
        'Correo': empleado.correo,
        'Celular': empleado.celular,
        'Usuario': empleado.user,
        'Apellido': empleado.apellido,
    })
}

export function eliminar(usuario) {
    return http().put('verify/actualizarEstadoEmpleado', {
        'ID': usuario.id,
        'Estado': usuario.estado,
    })
}

export function cambiarPass(usuario) {
    return http().put('verify/actualizarContrasena', {
        'ID': usuario.id,
        'Login': usuario.id_login,
        'Password': usuario.password,
        'Rep_Password': usuario.rep_password,
    })
}