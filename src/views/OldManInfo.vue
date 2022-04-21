<template>
  <!-- 老人基础信息 -->
  <div class="old-box">
    <div class="btn-group">
      <el-button type="primary" @click="addInfo">添加新老人</el-button>
      <el-button @click="editInfo">编辑当前老人</el-button>
    </div>
    <el-descriptions class="old-info" direction="vertical" :column="3" border>
      <el-descriptions-item>
        <img src="../assets/oldHead.png" alt="" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 姓名 </template>
        <input type="text" v-model="oldInfo.name" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 电话 </template>
        <input type="text" v-model="oldInfo.tel" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 身份证号 </template>
        <input type="text" v-model="oldInfo.personNum" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 性别 </template>
        <input type="text" v-model="oldInfo.sex" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 出生日期 </template>
        <input type="text" v-model="oldInfo.birth" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 年龄 </template>
        <input type="text" v-model="oldInfo.age" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 家庭住址 </template>
        <input type="text" v-model="oldInfo.address" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 婚姻状况 </template>
        <input type="text" v-model="oldInfo.marry" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 民族 </template>
        <input type="text" v-model="oldInfo.nation" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 家庭人口 </template>
        <input type="text" v-model="oldInfo.family" :disabled="disable" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 入住状态 </template>
        <input type="text" v-model="oldInfo.status" :disabled="disable" />
      </el-descriptions-item>
    </el-descriptions>
    <div class="cofirm-btn" v-show="!disable">
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OldManInfo",
  data() {
    return {
      oldInfo: {
        name: "王小二", //姓名
        tel: "13009772012", //电话号码
        sex: "男", //性别
        personNum: "34122120011112606X", //身份证
        address: "翻斗花园二号楼1102", //家庭住址
        birth: "1934-02-18", //出生日期
        marry: "已婚", //婚姻状况
        status: "入住", //入住状态
        nation: "汉族", //民族
        family: 3, //家庭人口
        age: 66, //年龄
      },
      disable: true, //是否禁用  为false时可进行编辑
    };
  },
  methods: {
    editInfo() {
      this.disable = false;
    },
    addInfo() {
      this.disable = false;
    },
    confirm() {
      this.disable = true;
    },
  },
};
</script>


<style lang="scss" scoped>
.old-box {
  margin: 50px auto;
}
.btn-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.old-info {
  width: 1000px;
  img {
    width: 120px;
  }
  input {
    font-size: 18px;
    padding: 3px;
    &:focus {
      outline: none;
    }
  }
  input[disabled] {
    background-color: #fff;
    border: none;
  }
}
.cofirm-btn {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>