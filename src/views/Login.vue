<template>
  <div class="login">
    <div class="login-box">
      <div class="login-title">登录</div>
      <div class="login-content">
        <div class="login-user">
          <div class="el-icon-user login-icon"></div>
          <span>用户名</span>
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
      <div v-show="showTips" class="error-tips">请填写正确的用户名或密码</div>
      <div class="login-button" @click="goToHome">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      showTips: false, // 是否展示错误提示
    };
  },
  methods: {
    hadleInputUser(e) {
      this.userName = e.target.value;
    },
    handleInputWord(e) {
      this.password = e.target.value;
    },
    // 登录跳首页
    goToHome() {
      //用户名和密码均填写且后端校验成功
      console.log(
        "this.userName && this.password",
        this.userName && this.password
      );
      if (this.userName && this.password) {
        this.showTips = false;
        this.$router.replace("/home");
      } else {
        this.showTips = true;
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
    height: 250px;
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
}
</style>