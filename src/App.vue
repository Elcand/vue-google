<script setup>
import { ref } from "vue";
import { googleTokenLogin } from "vue3-google-login";
const accessToken = ref(localStorage.getItem("accessToken"));

const login = () => {
  googleTokenLogin().then((response) => {
    accessToken.value = response.access_token;
    localStorage.setItem("accessToken", accessToken.value);
  });
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header">
            <h5 class="card-title mb-0">Google Login with Vue 3</h5>
          </div>
          <div class="card-body">
            <div class="text-center">
              <div v-show="accessToken" className="alert alert-success">
                Login Success.
              </div>
              <button class="btn btn-primary" @click="login">
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
