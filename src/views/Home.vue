<template>
  <div class="home">
    <div class="home-top" @click="goHome">
      <div class="home-title">智慧化康养系统</div>
      <el-tooltip effect="light" content="退出登录" placement="top">
        <div class="el-icon-switch-button" @click="showAlert"></div>
      </el-tooltip>
    </div>
    <div class="home-content">
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#97CBFF"
          text-color="#ffffff"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>康养管理</span>
            </template>
            <el-menu-item index="1-1" @click="goToPage('/oldManList')"
              >老人列表</el-menu-item
            >
            <el-menu-item index="1-2" @click="goToPage('/OutList')"
              >外出查询</el-menu-item
            >
            <el-menu-item index="1-3" @click="goToPage('/VisitList')"
              >来访查询</el-menu-item
            >
            <el-menu-item index="1-6" @click="goToPage('/complaint')"
              >老人投诉</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>志愿者管理</span>
            </template>
            <el-menu-item index="2-1" @click="goToPage('/volunteer')"
              >志愿者信息维护</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>机构管理</span>
            </template>
            <el-menu-item index="3-1" @click="goToPage('/mechanism')"
              >机构信息维护</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">健康管理</span>
            </template>

            <el-menu-item index="4-3" @click="goToPage('/healthy')"
              >健康查看</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>安全管理</span>
            </template>
            <el-menu-item index="5-1" @click="goToPage('/position')"
              >定位监控</el-menu-item
            >
            <el-menu-item index="5-1" @click="goToPage('/fall')"
              >跌倒监控</el-menu-item
            >
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>护理人员管理</span>
            </template>
            <el-menu-item index="6-1" @click="goToPage('/nurse')"
              >护理人员信息维护</el-menu-item
            >
            <el-menu-item index="6-1" @click="goToPage('/nurseDuty')"
              >护理人员排班</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
      <div class="home-list" v-show="showList">
        <div
          class="list-item"
          v-for="(item, idx) in people_list"
          :key="idx"
          @click="goNextPage(item.path)"
        >
          <div class="item-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="item-text">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-num">{{ item.num }}</div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import { get,host } from "../tools/request";
export default {
  name: "Home",
  data() {
    return {
      people_list: [
        {
          img: require("../assets/oldman.png"),
          name: "老人数量",
          num: 200,
          path: "/oldManList",
        },
        {
          img: require("../assets/volunteer.png"),
          name: "志愿者数量",
          num: 30,
          path: "/volunteer",
        },
        {
          img: require("../assets/bed.png"),
          name: "床位数量",
          num: 300,
          path: "",
        },
      ],
      showList: true,
    };
  },
  mounted() {
    this.findOld();
    if (window.location.hash === "#/home") {
      this.showList = true;
    } else {
      this.showList = false;
    }
  },
  watch: {
    $route: {
      handler(val) {
        console.log("val", val);
        if (val.path === "/home") {
          this.showList = true;
        } else {
          this.showList = false;
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    goToPage(item) {
      this.showList = false;
      this.$router.replace(item);
    },
    logout() {
      this.$router.replace("/");
    },
    goHome() {
      this.showList = true;
      this.$router.replace("/home");
    },
    showAlert() {
      this.$confirm("是否要退出登录？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "退出",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.logout();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goNextPage(path) {
      if (path) {
        this.showList = false;
        this.$router.push(path);
      } else {
        return;
      }
    },
    findOld() {
      const uuid = "20220512171303011274387162093938";
      get(`${host}/wme/elder/queryById/${uuid}`).then(
        (res) => {
          console.log("rerere", res);
        }
      );
    },
  },
};
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.home {
  height: 100vh;
  .home-top {
    font-size: 20px;
    background-color: #66b3ff;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    background-image: url(../assets/top.png);
    background-size: (100%);
  }
  .home-content {
    height: 90%;
    display: flex;
    .menu {
      width: 15%;
      .el-menu-vertical-demo {
        height: 100%;
      }
    }
    .home-list {
      display: flex;
      align-items: center;
      margin-left: 50px;
      .list-item {
        width: 220px;
        border-radius: 20px;
        background-color: #00ffff;
        margin: 0 50px;
        display: flex;
        align-items: center;
        padding: 30px;
        .item-img {
          background-color: #f7f7f7;
          width: 120px;
          height: 120px;
          margin-right: 10px;
          img {
            width: 120px;
          }
        }
        .item-text {
          .item-name {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .item-num {
            font-size: 20px;
            color: #ff2d2d;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
