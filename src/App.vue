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
            <div class="alert text-center">
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
.container {
  margin-top: 2rem;
  margin-left: 10rem;
  margin-right: 10rem;
  padding-left: 10rem;
  padding-right: 10rem;
}

.card {
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-left: 10rem;
  margin-right: 10rem;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #c3c3c3;
  margin-bottom: 2rem;
  padding-bottom: 4px;
  padding-left: 6px;
}

.card-body {
  text-align: center;
}

.card-title {
  margin-bottom: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.alert {
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  margin: 1rem;
  padding: 8px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
