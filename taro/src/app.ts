import { createApp } from "vue";
import pinia from "./stores";
import "./app.css";

const App = createApp({
  onShow(options) {
    console.log("App onShow.");
  },
});

App.use(pinia);

export default App;
