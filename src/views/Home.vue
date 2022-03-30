<template>
  <div class="home">
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#272727"
        text-color="#ffffff"
      >
        <el-menu-item index="/demo" @click="goTo">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="/index">
          <i class="el-icon-setting"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
// import router from "../router/index";
export default {
  name: "Home",
  methods: {
    goTo() {
      this.$router.push("/about");
    },
  },
};
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100vh;
  .menu {
    width: 15%;
    .el-menu-vertical-demo {
      height: 100%;
    }
  }
}
</style>
