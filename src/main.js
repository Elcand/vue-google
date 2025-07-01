import { createApp } from "vue";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";
const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "508789945468-f1ak651ja7mpf0ht2qn8cahu4mddue3v.apps.googleusercontent.com",
});

app.mount("#app");
