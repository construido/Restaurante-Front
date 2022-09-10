import { http } from './http.js'

export function login(credenciales) {
    return http().post('/login', {
        'Usuario' : credenciales.Usuario,
        'password': credenciales.password
    })
}

export async function logout() {
    const res = await http().post('/verify/logout')
    setTimeout(() => {
        window.location.href = "/login"
        localStorage.removeItem('token')
        localStorage.removeItem('estado')
    }, 2000)
}