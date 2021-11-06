<template>
<div v-show="$store.state.nav">
  <div class="bg-danger navContainer">
    <div>
     <router-link class="text-white text-lg brand" to="/">Quora</router-link>
    </div>
     <div>
        <div class="">
          <span class="">
            <router-link to="/" class="btn text-sm">Home</router-link>
          </span>
          <span class="">
            <router-link to="/Register" class="btn text-sm">Register</router-link>
          </span>
          <span class="">
            <router-link to="/Login" class="btn text-sm">Login</router-link>
          </span>
          </div>
     </div>
  </div>
</div>

  <router-view />

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
.navContainer{
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
}


.brand{
  padding: 0 4px;
  text-decoration: none;
  font-size: 20px;
}


</style>
