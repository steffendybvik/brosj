import Vue from 'vue'
import App from './layouts/default.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { auth } from './services/init-firebase'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    './components/base',
    false,
    /Brosj[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
        camelCase(
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    )
    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    )
})

Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(user => {
    if (!app) {
        user = auth.currentUser;
        if (user) {
            store.dispatch('user/setUser', user);
        }
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
});