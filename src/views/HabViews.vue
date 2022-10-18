<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="账本详情">

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="remitter" label="汇款人"/>
        <el-table-column prop="payee" label="收款人"/>
        <el-table-column prop="remittance_Time" label="汇款时间"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="remarks" label="交易用途"></el-table-column>
        <el-table-column align="right" width="200px">

          <template #default="scope">
            <el-button type="danger" size="big" @click="DelCheck(scope.row.id)">Delete</el-button>
          </template>

        </el-table-column>

      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 10px">
        <el-pagination
            v-model:current-page="this.index"
            background layout="prev, pager, next"
            :total="this.page.total"
            :page-size="10"
            @prev-click="FindCheck"
            @current-change="FindCheck"
            @next-click="FindCheck"
        />
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="添加交易">
      <el-form label-width="120px" :model="this.form">
        <el-form-item label="汇款者:">
          <el-radio-group v-model="this.form.remitter">
            <el-radio label="彭啸洲"/>
            <el-radio label="彭啸峰"/>
            <el-radio label="彭明昕"/>
            <el-radio label="谌冬梅"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收款者:">
          <el-input v-model="this.form.payee"/>
        </el-form-item>
        <el-form-item label="汇款时间:">
          <el-col :span="11">
            <el-date-picker
                v-model="form.Remittance_Time"
                type="date"
                placeholder="交易时间"
                style="width: 100%"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="汇款金额:">
          <el-input v-model="this.form.money"/>
        </el-form-item>
        <el-form-item label="交易用途:">
          <el-input v-model="this.form.remarks" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddCheck">添加此交易</el-button>
          <el-button type="warning" @click="reload">取消添加此交易</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="修改密码">
      <div
          style="margin: 200px auto; background-color: SkyBlue; width: 350px; height: 350px; padding: 20px; border-radius: 10px">
        <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>修 改 账 户 密 码</b></div>
        <el-form ref="userForm">
          <el-form-item prop="username">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"
                      v-model="modifyData.defaultPassword"
                      placeholder="原密码"></el-input>
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="modifyData.newPassword"
                      placeholder="新密码"></el-input>
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"
                      v-model="modifyData.testPassword"
                      placeholder="请再次输入新密码"></el-input>
            <el-form-item style="margin: 10px 0; text-align: right">
            </el-form-item>
            <el-button type="danger" size="big" autocomplete="off" @click="ModifyPasswordCheck()">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="注销此用户">
      <el-button @click="CancellationCheck()" type="danger" style="text-align: center;height: 5vh;">注销此用户
      </el-button>
    </el-tab-pane>
    <el-tab-pane label="登出">
      <el-button @click="logout" type="danger" style="text-align: center;height: 5vh;">退出登录</el-button>
    </el-tab-pane>
  </el-tabs>


</template>

<script lang="js" setup>


import axios from "axios";
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import router from "@/router";
import {ElButton} from 'element-plus'
import {ref} from "vue";

export default {


  name: "HabViews",
  components: {
    ElButton
  },

  data: function () {
    return {
      index: 1,
      page: {
        //当前页码
        index: 1,
        //每页展示数据数目
        size: 2,
        // 总共数据数目
        total: 10

      },
      nameLikeIndex: 1,
      del_info: "删除交易",
      isDisabled: false,
      search: "",
      tableData: [
        {
          id: '',
          remitter: '',
          payee: '',
          remittance_Time: '',
          money: '',
          remarks: ''
        },
      ],
      NameLikeTableData: [
        {
          id: '',
          remitter: '',
          payee: '',
          Remittance_Time: '',
          money: '',
          remarks: ''
        },
      ],
      AddTableData: [
        {
          id: '',
          remitter: '',
          payee: '',
          Remittance_Time: '',
          money: '',
          remarks: ''
        },
      ],
      form: [
        {
          remitter: '',
          payee: '',
          Remittance_Time: '',
          money: '',
          remarks: ''
        },
      ],
      modifyData: [
        {
          defultPassword: '',
          newPassword: '',
          testPassword: '',
        }

      ],
      id: '',
      nameLike: "",

    }


  },
  created() {
    this.mymessage()
    this.FindAllCheck()
    this.findPageCheck()
  },
  methods: {
    mymessage() {

    },
    reload() {
      location.reload()
    },
    CancellationCheck: function () {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.Cancellation();
            } else {
              router.push("/login")
            }
          }
      )
    },
    Cancellation: function () {
      ElMessageBox.confirm(
          '此操作不可逆,注销用户后,此用户将不存在,是否注销此用户?', '警告',
          {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',


          }).then(() => {
        if (window.sessionStorage.getItem("username") !== "") {
          axios({
            url: 'http://127.0.0.1:8080/user/' + window.sessionStorage.getItem("username"),
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              'token': window.sessionStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.state === 200) {
              window.sessionStorage.clear()
              router.push("/login")

            } else {
              ElMessage.error(res.data.message)
            }
          })

        } else {
          return false
        }

      })
          .catch(() => {

          })

    },
    ModifyPasswordCheck: function () {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.ModifyPassword();
            } else {
              router.push("/login")
            }
          }
      )
    },
    ModifyPassword: function () {
      if (this.modifyData.newPassword === this.modifyData.testPassword) {
        const param = {
          userName: window.sessionStorage.getItem('username'),
          defaultPassword: this.modifyData.defaultPassword,
          newPassword: this.modifyData.newPassword,
          token: window.sessionStorage.getItem('token')
        }
        axios({
          url: 'http://127.0.0.1:8080/user/modifyPassword',
          method: 'PUT',
          headers: param,

        }).then(res => {
          if (res.data.state === 200) {
            window.sessionStorage['token'] = res.data.token;
            this.$router.push("/login")
          } else {
            ElMessage.error(res.data.message)
          }
        })

      } else {
        ElMessage.error("两次密码不一致！");
      }
    },
    DelCheck: function (id) {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.id = id;
              this.doDel();
            } else {
              router.push("/login")
            }
          }
      )
    },
    doDel() {
      axios({
        url: 'http://127.0.0.1:8080/hab/' + this.id,
        method: 'delete',

      }).then(res => {
        if (res.data.state === 200) {
          ElNotification({
            title: 'Success',
            message: '删除交易成功!',
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'ERR',
            message: `删除交易失败!${res.data.message}`,
            type: 'error',
          })
        }
      })
    }
    ,
    AddCheck: function () {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.goAdd();
            } else {
              router.push("/login")
            }
          }
      )

    },
    goAdd: function () {
      const param = {
        remitter: this.form.remitter,
        payee: this.form.payee,
        Remittance_Time: this.form.Remittance_Time,
        money: this.form.money,
        remarks: this.form.remarks
      }
      console.log(param)
      if (param.remitter === undefined || param.payee === undefined || param.Remittance_Time === undefined || param.money === undefined || param.remarks === undefined) {
        ElMessage.error("您有信息没有填写完成!")
        return false;
      } else {
        axios({
          url: 'http://127.0.0.1:8080/hab/add',
          method: 'put',
          params: param
        }).then(res => {
          if (res.data.state === 200) {
            ElNotification({
              title: 'Success',
              message: '添加交易信息成功',
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'ERR',
              message: `添加交易信息失败! ${res.data.message}`,
              type: 'error'
            })
          }
        })
      }

    },
    FindCheck: function () {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.goFind();
            } else {
              router.push("/login")
            }
          }
      )
    },
    FindAllCheck() {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.FindAll();
            } else {
              router.push("/login")
            }
          }
      )
    },
    FindAll() {
      axios({
        url: 'http://127.0.0.1:8080/hab/findAll',
        method: 'get',
      }).then(res => {
        if (res.data.data != null) {
          this.page.total = res.data.data.length
        }
      })
    },
    goFind() {
      this.noLimitFind()
      if (this.search.length === 0) {
        this.findPageCheck()
      } else {

        axios({
          url: 'http://127.0.0.1:8080/hab/findAll',
          method: "GET"
        }).then(res => {
          console.log(res)
          console.log(res.data.data.length)
          if (res.data.data.length !== 0) {
            this.tableData = res.data.data
            this.page.total = res.data.data.length
          } else {
            this.tableData = null
          }

        })
      }

    },
    noLimitFind() {
      axios({
        url: 'http://127.0.0.1:8080/hab/nolimit',
        method: 'get',
        params: {
          'name': this.search
        }

      }).then(res => {
        this.page.total = res.data.data.length
      })
    }
    ,
    logout: function () {
      ElMessageBox.confirm(
          '登出后您将要重新登录,是否登出?', '警告',
          {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',


          }).then(() => {
        window.sessionStorage.clear();
        router.push("/login")
      })
          .catch(() => {
          })

    },
    findPageCheck: function () {
      axios({
        url: 'http://127.0.0.1:8080/checkToken',
        method: 'get',
        headers: {
          token: window.sessionStorage.getItem('token')
        }
      }).then(res => {
            if (res.data.state === 200) {
              this.findPage();
            } else {
              router.push("/login")
            }
          }
      )
    },
    findPage: function () {
      axios({
        url: 'http://127.0.0.1:8080/hab/findAll',
        method: 'get',
      }).then(res => {
        if (res.data.data != null) {
          console.log(res)
          this.tableData = (res.data.data)
          console.log(this.tableData)
        } else {
          this.tableData = null
        }
      })
    }

  }
}


</script>

<style scoped>

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
