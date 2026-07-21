import { createApp } from 'vue'
import pinia from './stores'
import { useSystemStore } from './stores/system'
import './app.css'

const App = createApp({
  onShow(options) {
    console.log('App onShow.')
  },
  onLaunch() {
    const store = useSystemStore()
    store.init()
    store.initLocation()
  }
})

App.use(pinia)

export default App
