<template>
  <div class="wrapper">
    <div
        style="margin: 200px auto; background-color: #fff; width: 350px; height: 450px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>免 密 登 录</b></div>
      <el-form ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="this.To"
                    placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <!-- 没有账号?<el-button type="warning" size="big" autocomplete="off" @click="this.$router.push('/register')">去注册</el-button> -->
          <el-button type="primary" size="big" autocomplete="off" @click="this.send" style="width: 100%;margin: 0 auto 50px;height: 5vh">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="pass" placeholder="验证码"></el-input>
        </el-form-item>
      </el-form>
      <el-form-item style="margin: 10px 0; text-align: right">
        <!-- 没有账号?<el-button type="warning" size="big" autocomplete="off" @click="this.$router.push('/register')">去注册</el-button> -->
        <el-button type="primary" size="big" autocomplete="off" @click="this.login" style="width: 100%;margin: 0 auto 50px;height: 5vh">登录</el-button>
	<el-button size="big" autocomplete="off" @click="this.$router.push('/register')" style="width: 100%;margin: 0px auto 50px;height: 5vh">没有账号?去注册!</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "MailLogin",
  data:function (){
    return{
      To:'',
      pass:''
    }
  },
  methods:{
    send:function (){
      axios({
        url:"http://127.0.0.1:8080/sendMail",
        method:'get',
        params:{
          'To':this.To
        }
      }).then(res=>{
        if(res.data.state === 200){
          ElMessage.success("发送成功!")
        }
        else{
          ElMessage.error(res.data.message)
        }
      })
    },
    login(){
      axios({
        url:"http://127.0.0.1:8080/verifyMail",
        method:'post',
        params:{
          "pass" : this.pass,
          "To" : this.To,
        }
      }).then(res=>{
	console.log(res);
        if(res.data.state === 200){
	  window.sessionStorage.setItem('token',res.data.token)
          console.log(window.sessionStorage.getItem('token'))
          window.sessionStorage.setItem('username', res.data.resultUsername)
          let userStatus = res.data.data.userStatus;
          sessionStorage.setItem('userStatus',userStatus);
          router.push('/');
        }
        else{
          this.$message.error(res.data.message);
        }
      })

    }
  }

}


</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
  overflow: hidden;
}
</style>          
