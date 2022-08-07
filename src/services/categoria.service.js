import { http } from './http.js'

export function listarSelect() {
    return http().get('verify/listarCategoriaSelect')
}

export function listar() {
    return http().get('verify/listarCategorias')
}

export function guardar(categoria) {
    return http().post('verify/guardarCategoria', {
        'Nombre': categoria.nombre,
        'Descripcion': categoria.descripcion
    })
}

export function editar(categoria) {
    return http().put('verify/actualizarCategoria', {
        'ID': categoria.id,
        'Nombre': categoria.nombre,
        'Descripcion': categoria.descripcion
    })
}

export function eliminar(categoria) {
    return http().put('verify/actualizarEstadoCategoria', {
        'ID': categoria.id,
        'Estado': categoria.estado,
    })
}