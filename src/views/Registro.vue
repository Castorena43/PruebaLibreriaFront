<template>
    <div class="container-custom">
        <div class="card" style="width: 24rem;">
            <div class="card-header">
                Bienvenidos
            </div>
            <div class="card-body text-start">
                <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="username" class="form-label text-start">Username</label>
                    <input type="text" class="form-control" id="username" v-model="user.username" required>
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label text-start">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="user.first_name" required>
                </div>
                <div class="mb-3">
                    <label for="apellido" class="form-label text-start">Apellido</label>
                    <input type="text" class="form-control" id="apellido" v-model="user.last_name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label text-start">Email</label>
                    <input type="email" class="form-control" id="email" v-model="user.email" required>
                </div>
                <div class="mb-3">
                    <label for="pwd" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pwd" v-model="user.password" required>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-success">Registrar</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
import { ref } from 'vue'
import callService from '../composables/service'
import showToast from '../composables/toasts'
import router from '../router'

    export default{
        name: 'Registro',
        setup(){
            const user = ref({
                username:null,
                password:null,
                first_name: null,
                last_name:null,
                email:null
            })
            let {makeRequest} = callService();

            const register = async () => {
                let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/register/`, 'POST', user.value);
                if (res.success === "ok") {
                    showToast('SUCCESS', 'Usuario creado correctamente', 2000 )
                    router.push('/login')
                } else {
                    showToast('ERROR', res.message, 2000 )
                }
            }

            return { user, register }
        }
    }
</script>

<style scoped>

.container-custom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

</style>