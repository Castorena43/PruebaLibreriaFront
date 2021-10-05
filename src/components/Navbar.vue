<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Libreria Castorena</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link active" :to="'/'">Libros</router-link>
                </li>
                
            </ul>
            <div class="d-flex">
                <button class="btn btn-light" type="button" v-on:click="logout">Cerrar Sesión</button>
            </div>
        </div>
    </div>
    </nav>
</template>

<script>
import callService from '../composables/service'
import showToast from '../composables/toasts';
import router from '../router';
    export default{
        name: 'Navbar',
        setup() {
            let { makeRequest } = callService();

            const logout = async () => {
                let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/logout/`,'GET')

                if(res.success === 'ok'){
                    showToast('SUCCESS', res.message, 2000);
                    await localStorage.removeItem('token');
                    router.push('/login');
                }
            }
            return { logout }
        }
    }
</script>