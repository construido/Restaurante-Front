import axios from "axios"

export const urlBase = "http://192.168.100.2:8000/api/";
//export const urlBase = "http://192.168.100.10:8080/api/";
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

export function http(){
    const intercertor = axios.create({
        baseURL: urlBase,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        timeout: 5000
    });

    intercertor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("******* INTERCEPTANDO ******");
            if(error.response.status === 401){
                window.location.href = "/login"
            }if (error.response.status === 422) {
                // return error.response.data.errors
                return error.response.status
            }
        }
    )

    return intercertor;
}