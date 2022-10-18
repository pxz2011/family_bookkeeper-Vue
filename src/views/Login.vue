<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 350px; height: 500px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
      <el-form ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="username"
                    placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <!-- 没有账号?<el-button type="warning" size="big" autocomplete="off" @click="this.$router.push('/register')">去注册</el-button> -->
          <el-button type="primary" size="big" autocomplete="off" @click="login" style="width: 100%;margin: 0 auto 50px;height: 5vh">登录</el-button>
          <el-button type="warning" size="big" autocomplete="off" @click="this.$router.push('/register')" style="width: 100%;margin: 0 auto 50px;height: 5vh">没有账号？去注册！</el-button>
	  <el-button type="primary" size="big" autocomplete="off" @click="this.$router.push('/mailLogin')" style="width: 100%;margin:0 auto 50px;height: 5vh">忘记密码?已有账号?免密登录!</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {ElMessage, TabsPaneContext} from "element-plus";
import Vuex from 'vuex';
import jwtDecode from "jwt-decode";
import qs from "qs";
import Cookies from "js-cookie";
axios.interceptors.request.use(config=> {
  let token = window.sessionStorage.getItem("token")
  if(token){
    config.headers['token'] = token
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default {
  name: 'login',
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {

    login: function () {
      const key = window.event.keyCode;
      console.log(key)
      let params = {
        userName: this.username,
        password: this.password
      };
      axios({
        url: "http://127.0.0.1:8080/user/login",
	data:JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'post',
      }).then(res => {
        console.log(res)
        if (res.data.state === 200) {
          ElMessage.success("登录成功!")
          sessionStorage.setItem('username', res.data.resultUsername)
          window.sessionStorage.setItem('token',res.data.token)
          console.log(window.sessionStorage.getItem('token'))
          let userStatus = res.data.data.userStatus;
          sessionStorage.setItem('userStatus',userStatus);
          let data = JSON.stringify(res.data.token)
          console.log(data)
          this.$router.push("/")
        } else {
          ElMessage.error(res.data.message + "!")
        }
      })
    },


  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
  overflow: hidden;
}
</style>
