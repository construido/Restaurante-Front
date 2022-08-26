import { http } from './http.js'

export function listar(params /*, filters*/) {
    return http().get('verify/listarCajas?page=' + (params.page + 1) + '&rows=' + params.rows) // + '&filters=' + filters)
}

export function listarDetalle(caja) {
    return http().get('verify/listarMovimientos?Caja='+caja)
}

export function apertura(caja) {
    return http().post('verify/aperturaCaja', {
        'Inicio': caja.inicio,
        'Observacion': caja.observacion
    })
}

export function cierre(caja) {
    return http().post('verify/cierreCaja', {
        'ID': caja.id,
        'Observacion': caja.observacion
    })
}