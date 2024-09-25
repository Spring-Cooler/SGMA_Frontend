import { createApp } from "vue";
import App from "./App.vue";

/* import default css files */
import "@/assets/style/color.css";
import "@/assets/style/common.css";

/* import v-calendar api */
import { setupCalendar } from "v-calendar";

const app = createApp(App);
app.use(setupCalendar, {});
app.mount("#app");
