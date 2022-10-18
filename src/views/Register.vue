<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 350px; height: 440px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注册</b></div>
      <el-form ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="username"
                    placeholder="Username"></el-input>

        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="password" placeholder="Password"></el-input>

        </el-form-item>
        <el-form-item prop="email">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="prefix-icon" v-model="email"
                    placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          
          <el-button type="primary" size="big" autocomplete="off" @click="login" style="width: 100%;margin: 0 auto 50px;height: 5vh">注册</el-button>
          <el-button type="warning" size="big" autocomplete="off" @click="this.$router.push('/login')" style="width: 100%;margin: 0 auto 50px;height: 5vh">已有账号？去登录！</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";
import qs from "qs";
import Cookies from "js-cookie";
export default {
  name: 'reg',
  data: function () {
    return {
      username: "",
      password: "",
      email: ''
    }
  },
  methods: {

    login: function () {
      let params = {
        userName: this.username,
        password: this.password,
        email: this.email,
      };
      let param = qs.parse(params)
      console.log(param)
      axios({
        headers: {
          'Content-Type':'application/json;charset=UTF-8',
          userName: params.userName,
          password: params.password,
          email: params.email
        },
        url: "http://127.0.0.1:8080/user/reg",
        method: 'post',
        params:param
      }).then(res => {
        console.log(res)
        if (res.data.state === 200) {
          ElMessage.success("注册成功!")
          router.push("/login")
        } else {
          ElMessage.error(res.data.message + "!")
        }
      })
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#login-btn {
  text-align: right;
}

</style>
