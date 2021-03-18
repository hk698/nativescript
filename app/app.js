import Vue from 'nativescript-vue';

import App from './components/App';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <App />
        </Frame>`,

    components: {
        App
    }
}).$start();