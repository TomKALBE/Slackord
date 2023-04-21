import io from "@/services/WebsocketService";
import { createApp } from "vue";
import { FontAwesomeIcon } from "@/tools/fontawesome";

import "./assets/main.css";

import App from "./App.vue";
const app = createApp(App);

app.provide("$socket", io);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
