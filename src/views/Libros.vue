<template>
    <div v-if="libros" class="container">
        <div style="padding-bottom:15px;">
            <h3>Libros</h3>
            
            <div class="d-flex justify-content-end">
                <input type="text" class="form-control"  id="exampleInput" v-model="search"  style="width:150px; margin-right:5px">
                <select class="form-select" aria-label="Default select example" v-model="parameter"  style="width:150px; margin-right:5px">
                    <option value="titulo">Titulo</option>
                    <option value="autor">Autor</option>
                    <option value="genero">Genero</option>
                </select>
                <button v-on:click="searchR" class="btn btn-success" value="Buscar" style="margin-right:5px"><i class="bi bi-search"></i></button>
                <button v-on:click="clean" class="btn btn-success" value="Limpiar"><i class="bi bi-x-circle"></i></button>
            </div>
            
        </div>
        <div class="accordion" id="accordionFlushExample">
            <div class="accordion-item" v-for="libro of libros" :key="libro.id">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapseOne`+libro.id" aria-expanded="false" :aria-controls="`flush-collapseOne`+libro.id">
                        {{libro.titulo}}
                    </button>
                </h2>
                <div :id="`flush-collapseOne`+libro.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body" style="">
                        <p><strong>Autor:</strong> {{libro.autor.nombre}}</p>
                        <p><strong>Generos:</strong> <span v-for="genero of libro.genero" :key="genero.id">{{genero.nombre}}, </span></p>
                        <p><strong>Fecha de publicacion:</strong> {{libro.f_publicacion}}</p>
                        <p><strong>Descripcion:</strong> {{libro.descripcion}}</p>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="button-custom">
            <router-link :to="'/create'" type="button" class="btn btn-success" style="width:100px;" >Crear</router-link>
        </div>
        
    </div>
    <div v-else>
        {{fetchStatus}}
    </div>
    
</template>

<script>
import { ref, onMounted } from 'vue'
import callService from '../composables/service'

export default {
    name:'Libros',
    setup(){
        const search = ref();
        const parameter = ref();
        const libros = ref([]);
        let { makeRequest, fetchStatus } = callService();

        onMounted(async () => {
            let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/libros/`, 'GET')

            if (res.success !== "ok") {
                    showToast('ERROR', res.message, 2000 )
                    fetchStatus.value = 'No hay libros';
                } 
            else {
                libros.value = res.data;
            }
        });

        const searchR = async () => {
            if (parameter.value === undefined){
                parameter.value = 'titulo';
            }
            let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/libros/search?${parameter.value}=${search.value}`)
            if (res.success !== "ok") {
                    showToast('ERROR', res.message, 2000 )
                    fetchStatus.value = 'No hay libros';
                } 
            else {
                libros.value = res.data;
            }
        }

        const clean = async () => {
            search.value = null;
            let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/libros/`, 'GET')

            if (res.success !== "ok") {
                    showToast('ERROR', res.message, 2000 )
                    fetchStatus.value = 'No hay libros';
                } 
            else {
                libros.value = res.data;
            }
        }


        return { libros, fetchStatus, search, parameter, searchR, clean }
    }
}
</script>

<style scoped>
.container{
    margin-top: 20px !important;
    padding: 50px !important;
}

.button-custom {
    display: flex;
    justify-content: flex-end;
}

.accordion-body p{
    text-align: start;
    margin-bottom: 0;
}
</style>