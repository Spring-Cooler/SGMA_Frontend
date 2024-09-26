import { createApp } from "vue";
import App from "./App.vue";

/* import default css files */
import "@/assets/styles/color.css";
import "@/assets/styles/common.css";

/* import v-calendar api */
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
app.use(VCalendar, {});
app.mount("#app");
