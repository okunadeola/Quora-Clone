<template>
  <div class="container-fluid">
    <div class="bg-light height-100">

    <div class="body w-100 rounded p-3">

      <p class="text-center h5">SignUp</p>
      <div class="row mx-md-1">
        <div class="col-md-6 form">
          <div class="form-group mb-3">
            <label for="">Username: </label>
            
              <i class="fa fa-user my-4"></i>
              <input
                type="text"
                @blur="v$.username.$touch"
                placeholder="username "
                v-model="username"
                class="w-100 form-control"
              />
            <small v-if="v$.username.$error" class="text-danger ">
            {{ v$.username.$errors[0].$message }} </small>
          </div>

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

            <div class="row">

            <div class=" col-md-6 form-group mb-3">
              <label for="">Password: </label>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input
                type="password"
                @blur="v$.password.$touch"
                placeholder="password"
                v-model="password"
                class="mb-3 w-100 form-control"
              />
              <small v-if="v$.password.$error" class="text-danger">
                {{ v$.password.$errors[0].$message }}
              </small>
            </div>

            <div class="col-md-6 form-group mb-3">
            <label for="">Confirm Password: </label>
              <i class="fa fa-key my-4" aria-hidden="true"></i>
              <input
                type="password"
                @blur="v$.cPassword.$touch"
                placeholder="comfirm password"
                class="mb-3 w-100 form-control"
                v-model="cPassword"
              />
              <small v-if="v$.cPassword.$error" class="text-danger">
                {{ v$.cPassword.$errors[0].$message }}
              </small>
            </div>
            </div>

            <button
              @click="register"
              class="btn btn-sm btn-primary shadow text-white my-3 form-control"
            >
              Signup
            </button>
            <span>Already Register!</span>
              <router-link class="mx-2" to="/Login">Signin</router-link>
          </div>
        </div>
   
      </div>
      </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
export default {
  name: "Register",
 data() {
    return {
      v$: useValidate(),
        username: "",
        email: "",
        password: "",
        cPassword: "",
        registerLog: []
    };
  },
  validations() {
    return {
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        cPassword: { required, sameAs: sameAs(this.password) 
      },
    };
  },

  methods: {

    register() {
      this.v$.$validate();
        if (!this.v$.$error) {
        
        if (this.email !== "" && this.password !== "" && this.username !== "" && this.cPassword !== "") {
          
          let loc = JSON.parse(localStorage.getItem("quora"))
          if (loc === null) {
            loc = []
          }
          if (this.password === this.cPassword) {
            this.registerLog.push({id:loc.length +1, username:this.username, email:this.email, password:this.password, cPassword:this.cPassword, following:[], interest:[], draft:[], space:["History", "Education", "Psychology", "Science", "Health", "Technology", "Literature", "Marketing", "Relationship", "Sport", "Politics"], post:[], bookmark:[]})
              if (localStorage.getItem("quora") === null) {
                localStorage.setItem("quora", JSON.stringify(this.registerLog));

              this.username= ''
              this.email=''
              this.password=''
              this.cPassword=''
              this.registerLog = [] 
              this.$router.push('/Login')

              
              } else {
                let local = JSON.parse(localStorage.getItem("quora"))
                let identifier = local.find(val=>{
                return val.username === this.username
                })
                if (!identifier) {
                  local.push(...this.registerLog)
                  localStorage.setItem("quora", JSON.stringify(local));
                  this.username= ''
                  this.email=''
                  this.password=''
                  this.cPassword=''
                  this.registerLog = [] 
                  this.$router.push('/Login')
                  
                }else{
                  alert("sorry username is not available")
                }
              }
                
          }else{ alert("your passwords does not match")}
        }else{alert("all field must be filled")}
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