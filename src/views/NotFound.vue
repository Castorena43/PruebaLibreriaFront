<template>
  <link href="https://fonts.googleapis.com/css?family=Nunito:400,700" rel="stylesheet">
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404"></div>
      <h1>404</h1>
      <h2>Oops! Página no encontrada</h2>
      <p>Lo sentimos, pero la página que buscaste no existe, ha sido removida, cambió su nombre, o está temporalmente deshabilitada.</p>
      <router-link :to="'/'" >Regresar a la página principal</router-link>
    </div>
  </div>
</template>


<script>
import router from '../router'

export default {
  name: 'NotFound'
}
</script>
