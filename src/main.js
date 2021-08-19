import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';



const app = createApp(App);
app.use(router);
UIkit.use(Icons);

// components can be called from the imported UIkit reference
UIkit.notification('Hello world.');
app.mount('#app');
