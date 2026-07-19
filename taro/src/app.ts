import { createApp } from "vue";
import pinia from "./stores";
import { useSystemStore } from "./stores/system";
import "./app.css";

const App = createApp({
  onShow(options) {
    console.log("App onShow.");
  },
  onLaunch() {
    useSystemStore().init();
  },
});

App.use(pinia);

export default App;
