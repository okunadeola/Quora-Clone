<template>
  <div class="container-fluid">
    <div class="container bg-light">
      <form @submit.prevent="login" class="justify-center form pt-5 pb-5 w-50">
         <div class="display-6 text-secondary text-center my-2">Login</div> 
        <input type="email" class="form-control" placeholder="email"  v-model="email"/> <br>
        <input type="password" class=" form-control" placeholder="password" v-model="password"/> <br>
        <input type="submit" class=" form-control bg-secondary text-light" value="login">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      email:'',
      password:'',
    }
  },
  // provide:{
  //  id:""
  // },
  methods:{
    login(){
      if (this.email !== "" && this.password !== "") {
        let store = JSON.parse(localStorage.getItem("quora"));
        let result = store.find(res=> res.email===this.email && res.password===this.password)
        if (result) {
          this.$router.push(`/Quora/${result.id}`)
          this.$store.dispatch({type:'closeNav'})
        }else{
          alert("credentials not find, kindly register")
        }
        
      }else{
        alert("please fill in your credentials to login")
      }
      
    }
  }
}
</script>
<style scoped>
.form{
  margin: 20px auto;
}
</style>