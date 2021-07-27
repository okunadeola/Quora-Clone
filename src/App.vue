<template>
<div v-show="$store.state.nav">
<div class="container-fluid bg-danger ">
  <div class="container">
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="nav-link h4 mx-auto text-white" to="/">Quora</router-link>
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navs" aria-controls="nav" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <div  class="collapse navbar-collapse navDiv text-muted" >
      <ul class="navbar-nav mb-2 mb-lg-0  navs">
        <li class="nav-item  col-2 col-md-5">
          <router-link to="/" class="nav-link btn mr-auto">Home</router-link>
        </li>
        <li class="nav-item col-2 col-md-5">
          <router-link to="/Register" class="nav-link btn ">Register</router-link>
        </li>
        <li class="nav-item col-2 col-md-5">
          <router-link to="Login" class="nav-link btn">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>

  </div>
</div>
  
</div>

  <router-view />
<!-- <div>
  {{$store.state.numb}}
  <button @click="$store.commit('increase')">increase</button>
  <button @click="$store.dispatch({type:'increment', anything: 1})">increase by 1</button>
  <button @click="$store.commit('decrease', {anything:2})">decrease 2</button>
  <button @click="$store.commit({type:'decrease', anything:4})">decrease 4</button>
</div> -->
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      point: 1
    }
  },
 
  
};
</script>

<style scoped>
.navDiv{
  display: flex;
  justify-content:end;
  align-items: flex-end;
}
.navs{
  margin-left: 45rem;
}
.navs .nav-link{
  color:rgb(245, 241, 241);
}
.navs li a:hover{
  color:#000;
  background: #fff;
  z-index: 2;
}
</style>
