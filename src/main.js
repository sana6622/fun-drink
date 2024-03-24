import '../src/assets/all.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/js/bootstrap.js"
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入 VeeValidate 元件跟功能
import {Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
// import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n'; 
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { required, email } from '@vee-validate/rules';



import App from './App.vue'
import router from './router'

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
// Object.keys(AllRules).forEach((rule) => {
//     defineRule(rule, AllRules[rule]);
//   });
  
  // 將當前 VeeValidate 的語系設定為繁體中文
  configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale('zh_TW');
  
// 定義驗證規則
defineRule('required', required);
defineRule('email', email);



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios,axios)
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
