<template>
    <div class="container-custom">
        <form style="width:512px; text-align:left;" @submit.prevent="create">
            <div class="mb-3">
                <label for="exampleInput" class="form-label">Titulo</label>
                <input type="text" class="form-control" id="exampleInput" v-model="libro.titulo" required>
            </div>
            <div class="mb-3">
                <label for="exampleInput" class="form-label">Descripcion</label>
                <input type="text" class="form-control" id="exampleInput" v-model="libro.descripcion" required>
            </div>
            <div class="mb-3">
                <label for="exampleInput" class="form-label">Fecha de publicacion</label>
                <DatePicker v-model="libro.f_publicacion" :model-config="modelConfig">
                    <template #default="{ inputValue, inputEvents }">
                        <input class="px-3 py-1 border rounded" :value="inputValue" v-on="inputEvents" />
                    </template>
                </DatePicker>
                <!-- <Calendar /> -->

            </div>
            <div class="mb-3">
                <label for="exampleInput" class="form-label">Autor</label>
                <select class="form-select" aria-label="Default select example" v-model="libro.autor" required>
                    <option v-for="autor of autores" :key="autor.id" :value="autor.id">{{autor.nombre}}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleInput" class="form-label">Generos</label>
                <select class="form-select" multiple aria-label="multiple select example" v-model="libro.genero" required>
                    <option v-for="genero of generos" :key="genero.id" :value="genero.id">{{genero.nombre}}</option>
                </select>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-success">Crear</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import callService from '../composables/service'
import showToast from '../composables/toasts'
import router from '../router'
import { Calendar, DatePicker } from 'v-calendar';

export default {
    name:'CreateLibro',
    components: {
        Calendar,
        DatePicker,
    },
    setup(){
        const generos = ref([]);
        const autores = ref([]);
        const libro = ref({
            titulo:null,
            descripcion:null,
            f_publicacion:null,
            autor: null,
            genero:[]
        });
        const modelConfig= {
            type: 'string',
            mask: 'YYYY-MM-DD', // Uses 'iso' if missing
        }
        let { makeRequest } = callService();
        onMounted(async () => {
            let res_g = await makeRequest(`${process.env.VUE_APP_ROOT_API}/generos`,'GET');
            let res_a = await makeRequest(`${process.env.VUE_APP_ROOT_API}/autores`,'GET');
            if(res_g.success !== 'ok') {
                showToast('ERROR', 'Error al obtener generos', 2000 )
            }
            else if(res_a.success !== 'ok') {
                showToast('ERROR', 'Error al obtener autores', 2000 )
            }
            else {
                generos.value = res_g.data;
                autores.value = res_a.data
            }
            
        });

        const create = async () => {
            libro.value.f_publicacion = libro.value.f_publicacion.split('T')[0]
            let res = await makeRequest(`${process.env.VUE_APP_ROOT_API}/libros/crear/`,'POST', libro.value);
            if (res.success === "ok") {
                showToast('SUCCESS', 'Libro creado exitosamente', 2000);
                router.push('/');
            }
            else {
                showToast('ERROR', 'Error al crear libro', 2000 )
            }
        }

        return { generos, autores, libro, create, modelConfig }

    }
    
}
</script>

<style scoped>
.container-custom {
    /* margin-top:50px;
    margin-bottom: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>