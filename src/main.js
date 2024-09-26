import { createApp } from "vue";
import App from "./App.vue";
import router from './router/router.js'; // 라우터 임포트

/* import default css files */
import "@/assets/styles/color.css";
import "@/assets/styles/common.css";

/* import v-calendar api */
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
app.use(VCalendar, {});
app.use(router); // 라우터 사용
app.mount("#app");
