import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUiPlus from 'element-plus'
import {ElMessage} from "element-plus";
import 'element-plus/dist/index.css'
import axios from "axios";
import Cookies from "js-cookie"
createApp(App).use(store).use(router).use(ElementUiPlus).use(ElMessage).mount('#app')


router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (window.sessionStorage.getItem('token')) { // 通过vuex state获取当前的token是否存在
            axios({
		    url: 'http://127.0.0.1:8080/checkToken',
                method: 'get',
                headers: {
                    token: window.sessionStorage.getItem('token'),
                }
            }).then(res => {
                    if (res.data.state === 200) {
                        next()
                    }
                    else{
                        window.sessionStorage.removeItem('token')
                        next({
                            path: '/login',
                            query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        })
                    }
                }
            )

        } else {
            ElMessage.warning("请先登录!");
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

