<template>
  <div class="container-fluid">
    <div class="container bg-light">
      <form @submit.prevent="login" class="justify-center form pt-5 pb-5 w-50">
         <div class="display-6 text-secondary text-center my-2">Login</div> 
        

         <div class="form-group mb-3">
              <label for="">Email: </label>
              <i class="fa fa-mail-bulk my-4"></i>
              <input
                type="email"
                placeholder="email"
                @blur="v$.email.$touch"
                v-model="email"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.email.$error" class="text-danger">
                {{ v$.email.$errors[0].$message }}
              </small>
            </div>
            
        <div class="form-group mb-3">
              <label for="">Password: </label>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input type="password"
                @blur="v$.password.$touch"
                placeholder="password"
                v-model="password"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.password.$error" class="text-danger">
                {{v$.password.$errors[0].$message }}
              </small>
         </div>
        <input type="submit" class=" form-control bg-secondary text-light" value="login">
        
        <span>Don't have an account Register!</span>
              <router-link class="mx-2" to="/Register">Signup</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, } from "@vuelidate/validators";
export default {
  name: "Login",
  data(){
    return{
      v$: useValidate(),
      email:'',
      password:'',
    }
  },

   validations() {
    return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
    };
  },
 
  methods:{
    login(){
      this.v$.$validate();
        if (!this.v$.$error) {
      if (this.email !== "" && this.password !== "") {
        let store = JSON.parse(localStorage.getItem("quora"));
        let result = store.find(res=> res.email===this.email && res.password===this.password)
        if (result) {
         this.$store.dispatch({ type: "setAuthentication", payload: true });
          this.$router.push(`/Quora/${result.id}`)
        }else{
          alert("credentials not find, kindly register")
        }
        
      }else{
        alert("please fill in your credentials to login")
      }
      
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