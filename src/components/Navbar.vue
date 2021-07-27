<template>
<header>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nav-tabs">
  <div class="container-fluid">
    <router-link class="h4 text-danger col-2 col-md-6 quora" to="/">Quora</router-link>
    <a class=" col col-md-2"  @click.prevent>Welcome {{username}}</a>
    <form class="d-flex my-2">
      <input class="form-control form-control-sm " type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-sm btn-outline-danger me-auto" type="submit">Search</button>
    </form>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navt" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navt">
      <a class="text-reset me-auto mx-5 " href="#">
        <i class="fas fa-bell lg my-2"></i>
        <sup class="badge rounded badge-notification bg-danger sm">1</sup>
      </a>

      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-item col-3 col-md-6">
          <router-link class="nav-link btn btn-sm " to="/" @click="$store.dispatch({type:'openNav'})">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
</template>
<script>
export default {
  name: "Navbar",
  props:["username"],
  data(){
    return{
     
    }
  },

  methods:{
    
  }
}
</script>
<style scoped>
  .lg{
    font-size: 1.4rem !important;
  }
  .sm{
    font-size: 0.5rem !important;
    margin-top: -10px !important;
  }
  .quora, a{
    text-decoration: none;
  }
</style>