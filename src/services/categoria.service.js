import { http } from './http.js'

export function listarSelect() {
    return http().get('verify/listarCategoriaSelect')
}

// export function listar(params = 1) { primera forma de llamar la paginacion
export function listar(params, filters) { // segunda forma de llamar la paginacion
    // params.page = params.page + 1
    return http().get('verify/listarCategorias?page=' + (params.page + 1) + '&rows=' + params.rows + '&filters=' + filters)
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