<template>
  <div class="container-fluid">
    <div class="container bg-light height-100">
      <form @submit.prevent="register" class="row form pt-5 pb-5 w-50 ">  
        <div class="display-6 text-secondary text-center">Register</div> 
        <input type="text" class="form-control my-2" v-model="username" placeholder="enter your username"/> <br>
        <input type="email" class="form-control my-2" v-model="email" placeholder="enter your email"/> <br>
        <input type="password" class="form-control my-2" v-model="password" placeholder="enter your password"/> <br>
        <input type="password" class="form-control my-2" v-model="cPassword" placeholder="confirm your password"/> <br>
        <input type="submit" class="form-control bg-secondary text-light my-2" value="register">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return{
      username:'',
      email:'',
      password:'',
      cPassword:'',
      registerLog:[]
    }

  }, 

  methods: {
    register(){

      if (this.email !== "" && this.password !== "" && this.username !== "" && this.cPassword !== "") {
        
        let loc = JSON.parse(localStorage.getItem("quora"))
        if (loc === null) {
          loc = []
        }
        if (this.password === this.cPassword) {
          this.registerLog.push({id:loc.length +1, username:this.username, email:this.email, password:this.password, cPassword:this.cPassword, following:[], interest:[], draft:[], space:["History", "Education", "Psychology", "Science", "Health", "Technology", "Literature", "Marketing", "Relationship", "Sport", "Politics"], post:[], bookmark:[]})
            if (localStorage.getItem("quora") === null) {
              localStorage.setItem("quora", JSON.stringify(this.registerLog));
            } else {
              let local = JSON.parse(localStorage.getItem("quora"))
              let identifier = local.find(val=>{
               return val.username === this.username
              })
              console.log(identifier);
              if (!identifier) {
                local.push(...this.registerLog)
                localStorage.setItem("quora", JSON.stringify(local));
                
              }else{
                alert("sorry username is not available")
              }
            }
            this.username= ''
            this.email=''
            this.password=''
            this.cPassword=''
            this.registerLog = []     
        }else{ alert("your passwords does not match")}
      }else{alert("all field must be filled")}
    }
  }
}
</script>
<style scoped>
.form{
  margin: 20px auto;
}
</style>