import { createApp } from 'vue'
import App from './App.vue'
import './style/index.less'
import '@/plugins/vant'
import dayjs from 'dayjs';
import currency from 'currency.js'

import { moneyFormatter, dateFormatter } from '@/utils/formatter.js';

import router from './router/index.js';


import { registryComponents } from '@/components/index.js'

const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$currency = currency
app.config.globalProperties.$moneyFormatter = moneyFormatter
app.config.globalProperties.$dateFormatter = dateFormatter

registryComponents(app)

app.use(router)

app.mount('#app')
