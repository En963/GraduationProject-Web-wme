<template>
  <div class="login">
    <!-- 登录页面 -->
    <div class="login-box" v-if="loginStatus">
      <div class="login-title">登录</div>
      <div class="login-content">
        <div class="login-user">
          <div class="el-icon-user login-icon"></div>
          <span>账号</span>
          <input
            type="text"
            placeholder="请输入用户名"
            class="input-wrapper"
            @input="hadleInputUser"
          />
        </div>
        <div class="login-password">
          <div class="el-icon-lock login-icon"></div>
          <span>密码</span>
          <input
            type="password"
            placeholder="请输入密码"
            class="input-wrapper"
            @input="handleInputWord"
          />
        </div>
      </div>
      <div class="register-tip" @click="goRegist">点击注册</div>

      <div v-show="showTips" class="error-tips">{{ tipContent }}</div>
      <div class="login-button" @click="goToHome">登录</div>
    </div>

    <!-- 注册页面 -->
    <div class="register-box" v-else>
      <div class="register-title">注册</div>
      <div class="register-content">
        <div class="register-user">
          <div class="el-icon-user register-icon"></div>
          <span>账号</span>
          <input
            type="text"
            placeholder="请输入用户名"
            class="input-wrapper"
            @input="handleRegisterUser"
          />
        </div>
        <div class="register-password">
          <div class="el-icon-lock register-icon"></div>
          <span>密码</span>
          <input
            type="password"
            placeholder="请输入密码"
            class="input-wrapper"
            @input="handleRegisterWord"
          />
        </div>
        <div class="register-code">
          <div class="el-icon-key register-icon"></div>
          <span>验证码</span>
          <input
            type="text"
            placeholder="请输入验证码"
            class="input-wrapper"
            @input="handleRegisterCode"
          />
          <input
            type="button"
            :value="codeMsg"
            class="get-code-btn"
            @click="getCode"
            :disabled="isDisable"
          />
        </div>
        <div class="type-box">
          <span>选择注册类型</span>
          <el-radio-group v-model="type">
            <el-radio v-model="type" :label="0">管理员</el-radio>
            <el-radio v-model="type" :label="1">医护人员</el-radio>
            <el-radio v-model="type" :label="2">老人</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="register-button" @click="register">注册</div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../tools/request";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      showTips: false, // 是否展示错误提示
      loginStatus: true,
      tipContent: "",
      codeMsg: "获取验证码",
      totalTime: 10,
      isDisable: false,
      timer: null,
      registerName: "",
      registerWord: "",
      regitserCode: "",
      type: 0, //0是管理员，1是医护人员，2是老人
    };
  },
  methods: {
    hadleInputUser(e) {
      this.userName = e.target.value;
    },
    handleInputWord(e) {
      this.password = e.target.value;
    },
    handleRegisterUser(e) {
      this.registerName = e.target.value;
    },
    handleRegisterWord(e) {
      this.registerWord = e.target.value;
    },
    handleRegisterCode(e) {
      this.registerCode = e.target.value;
    },
    // 登录跳首页
    goToHome() {
      //用户名和密码均填写且后端校验成功
      if (this.userName && this.password) {
        let params = {
          phone: this.userName,
          password: this.password,
        };
        get("http://192.168.31.114:8089/wme/main/login", params).then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.showTips = false;
            if (res.type === "0") {
              this.$router.replace("/home");
            } else if (res.type === "1") {
              this.$router.replace({
                path: "/doctor",
                query: {
                  doctorUuid: res.doctorUuid,
                },
              });
            } else if (res.type === "2") {
              this.$router.replace({
                path: "/older",
                query: {
                  elderUuid: res.elderUuid,
                },
              });
            }
          } else if (res.code === 1) {
            this.showTips = true;
            this.tipContent = "该用户未注册，请先注册";
          } else if (res.code === 2) {
            this.showTips = true;
            this.tipContent = "请填写正确的用户名或密码";
          }
        });
      } else {
        this.showTips = true;
      }
    },

    //注册
    goRegist() {
      this.loginStatus = false;
    },
    getCode() {
      this.isDisable = true;
      if (this.isDisable && this.registerName) {
        let params = {
          phone: this.registerName,
        };
        get("http://192.168.31.114:8089/wme/main/dysms", params).then((res) => {
          console.log(res);
        });
      }
      this.timer = setInterval(() => {
        this.totalTime--;
        this.codeMsg = `${this.totalTime}秒后重新发送`;
        if (this.totalTime < 0) {
          this.isDisable = false;
          clearInterval(this.timer);
          this.totalTime = 10;
          this.codeMsg = "发送验证码";
        }
      }, 1000);
    },
    register() {
      if (this.registerName && this.registerWord && this.registerCode) {
        let params = {
          code: this.registerCode,
          phone: this.registerName,
          password: this.registerWord,
          type: this.type,
        };
        get("http://192.168.31.114:8089/wme/main/register", params).then(
          (res) => {
            if (res === true) {
              this.loginStatus = true;
              this.userName = this.registerName;
              this.password = this.registerWord;
            }
          }
        );
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.login {
  height: 100vh;
  background-image: url(../assets/background.png);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    height: 300px;
    width: 300px;
    background-color: #fff;
    .login-title {
      display: flex;
      justify-content: center;
      font-size: 28px;
      padding-top: 20px;
    }
    .login-content {
      margin-top: 20px;
      span {
        margin-right: 10px;
      }
      .login-icon {
        font-size: 20px;
        margin-right: 10px;
      }
      .login-user,
      .login-password {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .input-wrapper {
        height: 20px;
      }
    }
    .register-tip {
      margin-top: -10px;
      display: flex;
      justify-content: center;
      color: #666;
      margin-bottom: 20px;
    }
    .error-tips {
      margin-bottom: 20px;
      color: red;
      font-size: 10px;
      display: flex;
      justify-content: center;
    }
    .login-button {
      width: 100px;
      height: 30px;
      background-color: #acd6ff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
  .register-box {
    height: 300px;
    width: 400px;
    background-color: #fff;
    .register-title {
      display: flex;
      justify-content: center;
      font-size: 28px;
      padding-top: 20px;
    }
    .register-content {
      margin-top: 20px;
      margin-left: 30px;
      span {
        margin-right: 10px;
      }
      .register-icon {
        font-size: 20px;
        margin-right: 10px;
      }
      .register-user,
      .register-password,
      .register-code {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .input-wrapper {
        height: 20px;
      }
      .get-code-btn {
        background: #acd6ff;
        margin-left: 5px;
        padding: 2px;
        border-radius: 2px;
        border: none;
      }
      .type-box {
        span {
          font-size: 12px;
        }
        margin-left: -12px;
        margin-bottom: 12px;
      }
    }
    .register-button {
      width: 100px;
      height: 30px;
      background-color: #acd6ff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
}
</style>