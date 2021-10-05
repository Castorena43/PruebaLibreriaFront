import { ref } from 'vue'
import showToast from '../composables/toasts'
import router from '../router'

const callService = () => {
    const fetchStatus = ref('Cargando...')

    const makeRequest = async (url, method, bodyData = null) => {
        try {
            let requestParams = {
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            if (method !== 'GET' && bodyData) {
                requestParams.body = JSON.stringify(bodyData)
            }
            // try to inject the token
            const token = localStorage.getItem('token')
            if (token) {
                requestParams.headers['Authorization'] = `Token ${token}`
            }
            // MAKE THE FETCH!
            let response = await fetch(url, requestParams)

            // get the json response
            let resData = await response.json()

            // check for status codes
            if (response.status === 401) {
                // alerta = Sesión caducada, obteniendo nuevo token.
                showToast('ERROR', 'No haz iniciado sesión.', 5000)
                router.push({ path: `/login` })
                
            }
            if (response.status === 200 || response.status === 201) {
                return resData
            }
            else if (response.status >= 400 && response.status !== 401) {
                showToast('ERROR', resData.detail, 3000)
                throw Error(resData.detail)
            }
        } catch (err) {
            fetchStatus.value = err.message
        }
    }
    return { fetchStatus, makeRequest }
}

export default callService
