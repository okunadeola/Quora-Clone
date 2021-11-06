<template>

<div class="container">
  <div class="mt-5 d-flex row">
    <div class="col-12 col-md-6 my-2">
      <h3>
        Welcome to your Quora App
      </h3>
      <p>here you can find answer to virtually all your questions, Enjoy!!</p>
      <router-link class="btn  btn-outline-danger" to="/register">Get Started Now</router-link>
    </div>
    <div class="col-12 col-md-4 mx-md-2">
      <img class="w-100" src="@/assets/quora.png" alt="">
    </div>

  </div>
</div>

</template>
<script>

export default {
  name: "Home"
}
</script>