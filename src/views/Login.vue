<template>
    <div class="container-custom">
        <div class="card" style="width: 24rem;">
            <div class="card-header">
                Bienvenidos
            </div>
            <div class="card-body text-start">
                <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="username" class="form-label text-start">Username</label>
                    <input type="text" class="form-control" id="username" v-model="user.username" required>
                </div>
                <div class="mb-3">
                    <label for="pwd" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pwd" v-model="user.password" required>
                </div>
                <div class="d-flex flex-row justify-content-end">
                    <router-link :to="'/registro'" class="btn btn-secondary col-3 p-2" style="margin-right:10px;">Registrar</router-link>
                    <button type="submit" class="btn btn-success col-3 p-2">Entrar</button>
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
        name: 'Login',
        setup(){
            const user = ref({
                username:null,
                password:null
            })
            let {makeRequest} = callService();

            const login = async () => {
                let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/login/`, 'POST', user.value);
                if (res.success === "ok") {
                    await localStorage.setItem('token',res.token)
                    router.push('/')
                } else {
                    showToast('ERROR', res.message, 2000 )
                }
            }

            return { user, login }
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