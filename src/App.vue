<script setup>
import { ref, onMounted } from "vue";
import { googleTokenLogin, googleLogout } from "vue3-google-login";
import axios from "axios";

const accessToken = ref(localStorage.getItem("accessToken"));
const profile = ref(JSON.parse(localStorage.getItem("profile")));
// console.log(profile.value);
const fetchUserProfile = async (token) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        params: {
          access_token: token,
        },
      }
    );

    profile.value = res.data;
    localStorage.setItem("profile", JSON.stringify(res.data));
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

onMounted(() => {
  if (accessToken.value && !profile.value) {
    fetchUserProfile(accessToken.value);
  }
});

const login = () => {
  googleTokenLogin().then((response) => {
    accessToken.value = response.access_token;
    localStorage.setItem("accessToken", accessToken.value);
  });
};

const handleLogout = () => {
  googleLogout();

  profile.value = null;
  accessToken.value = null;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("profile");
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
              <div v-if="profile">
                <div class="profile text-center mb-3">
                  <img
                    id="img-profile"
                    :src="profile.picture"
                    class="rounded-circle bg-dark p-2 shadow"
                    alt="User profile"
                  />
                </div>
                <table class="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <td id="name" class="fw-bold">Full Name</td>
                      <td>{{ profile.name }}</td>
                    </tr>
                    <tr>
                      <td id="email" class="fw-bold">Email Address</td>
                      <td>{{ profile.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn btn-danger" @click="handleLogout">
                  Log out
                </button>
              </div>
              <div v-else>
                <button class="btn btn-primary" @click="login">
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 1rem;
}

.card {
  width: 100%;
  max-width: 500px;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #c3c3c3;
  padding: 1rem;
  text-align: center;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  margin-bottom: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

#img-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
  padding: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  margin-bottom: 1rem;
}

#img-profile:hover {
  transform: scale(1.05);
}

#name,
#email {
  font-weight: bold;
  color: #4b0082;
  font-size: 1rem;
  padding: 0.5rem;
}

#name::before {
  content: "👤 ";
  margin-right: 0.5rem;
}

#email::before {
  content: "✉️ ";
  margin-right: 0.5rem;
}

.table {
  margin-top: 1.5rem;
  width: 100%;
}

.table td {
  padding: 0.75rem;
  vertical-align: middle;
  word-break: break-word;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.02);
}

.btn-primary {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  margin: 1rem;
  padding: 8px 16px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  margin: 1rem auto;
  padding: 10px 18px;
  display: block;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-danger:active {
  background-color: #bd2130;
}

@media (max-width: 576px) {
  #profile {
    width: 80px;
    height: 80px;
  }

  .card-body {
    padding: 1rem;
  }

  .btn-primary {
    width: 100%;
    padding: 12px;
  }

  .btn-danger {
    width: 100%;
    padding: 12px;
  }

  .table td {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
</style>
