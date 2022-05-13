<template>
  <!-- 老人 -->
  <div class="doctor-box">
    <div class="tab-content">
      <div class="alarm-tab" v-show="chooseNum === 1">
        <div class="text-area">
          <el-input
            type="textarea"
            v-model="congifure"
            :rows="10"
            :disabled="true"
          />
        </div>
        <div class="alarm-tips">吃药提醒</div>
        <div class="alarm-btn" @click="comfirmEat">确认</div>
      </div>
      <div class="write-tab" v-show="chooseNum === 2">
        <div class="select-box">
          <el-select v-model="doctorUuid" placeholder="请选择">
            <el-option
              v-for="item in nurseList"
              :key="item.doctorUuid"
              :label="item.doctorName"
              :value="item.doctorUuid"
            >
            </el-option>
          </el-select>
        </div>
        <div class="text-area">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="complaintDescribe"
            :rows="10"
          />
        </div>
        <div class="write-btn">
          <el-button type="primary" @click="confirmComplain">提交</el-button>
        </div>
      </div>
      <div class="schedule-tab" v-show="chooseNum === 3">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="doctorName" label="值班人" width="150">
          </el-table-column>
          <el-table-column prop="schedule" label="值班时间" width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="button-group">
      <div
        class="setting-btn"
        v-for="(item, index) in btn_list"
        :key="index"
        @click="jumpTab(item)"
        :class="{ active: chooseNum === item.num }"
      >
        <div :class="item.className"></div>
        <div>{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "../../components/Map.vue";
import { get, post, deleteFn, host } from "../../tools/request";
export default {
  name: "Older",
  components: { Map },
  data() {
    return {
      congifure: "",
      activeName: "first",
      nurseList: [],
      doctorUuid: "",
      chooseNum: 1,
      complaintDescribe: "",
      visitFlag: 0,
      handleFlag: 0,
      tableData: [],
      btn_list: [
        {
          num: 1,
          className: "el-icon-message-solid",
          value: "提醒",
        },
        {
          num: 2,
          className: "el-icon-edit",
          value: "评价",
        },
        {
          num: 3,
          className: "el-icon-document",
          value: "排班",
        },
      ],
    };
  },
  mounted() {
    this.getNurseList();
    this.getDoctorSchedule();
    this.getMedicine();
  },
  methods: {
    jumpTab(item) {
      this.chooseNum = item.num;
    },

    getNurseList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/wme/doctor`, params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.nurseList = records;
        }
      });
    },

    confirmComplain() {
      let params = {
        agencyUuid: this.doctorUuid,
        complaintDescribe: this.complaintDescribe,
        visitFlag: this.visitFlag,
        elderUuid: this.$route.query.elderUuid,
        handleFlag: this.handleFlag,
      };
      post(`${host}/wme/elderComplaint/addElderComplaint`, params).then(
        (res) => {
          if (res) {
            this.$message({
              message: "投诉成功",
              type: "success",
            });
          }
        }
      );
    },

    getDoctorSchedule() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/wme/doctorSchedule`, params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.tableData = records;
          this.tableData.map((item) => {
            this.nurseList.map((items) => {
              if (item.doctorUuid === items.doctorUuid) {
                item.doctorName = items.doctorName;
              }
            });
          });
          this.totalNum = res.total;
        }
      });
    },

    getMedicine() {
      get(
        `${host}/wme/elderMedicine/queryByElderId/${this.$route.query.elderUuid}`
      ).then((res) => {
        this.congifure = res.congifure;
      });
    },
    comfirmEat() {
      this.congifure = "";
      this.$message({
        message: "已确认",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.doctor-box {
  width: 375px;
  .tab-content {
    padding: 10px;
    .alarm-tab {
      .text-area {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .el-textarea__inner {
          height: 200px !important;
          // width: 300px;
          border: 1px solid #409eff;
        }
      }
      .alarm-tips {
        font-size: 30px;
        color: red;
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
      .alarm-btn {
        height: 200px;
        width: 200px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 80px auto 0;
        text-align: center;
        background-color: #409eff;
        color: #fff;
        font-size: 30px;
      }
    }
    .write-tab {
      .select-box {
        display: flex;
        justify-content: center;
      }
    }
    .write-btn {
      display: flex;
      justify-content: center;
      margin-top: 100px;
    }
    .text-area {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      .el-textarea__inner {
        height: 200px !important;
        // width: 300px;
        border: 1px solid #409eff;
      }
    }
  }

  .button-group {
    display: flex;
    position: fixed;
    padding: 10px 0;
    bottom: 0;
    background-color: #409eff;
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: #fff;
    .active {
      color: #ce0000;
    }
    .el-icon-message-solid,
    .el-icon-edit,
    .el-icon-document {
      font-size: 24px;
      // color: #fff;
      margin-bottom: 3px;
      display: flex;
      justify-content: center;
    }
  }
  // height: 100px;

  // background: red;
}
</style>