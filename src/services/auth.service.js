import { http } from './http.js'

export function login(credenciales) {
    return http().post('/login', {
        'Usuario' : credenciales.Usuario,
        'password': credenciales.password
    })
}

export async function logout() {
    const res = await http().post('/logout')
    setTimeout(() => {
        window.location.href = "/login"
        localStorage.removeItem('token')
    }, 2000)
}