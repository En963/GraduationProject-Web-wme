<template>
  <!-- 护工 -->
  <div class="doctor-box">
    <div class="tab-content">
      <div class="setting-tab" v-show="chooseNum === 1">
        <div class="select-box">
          <el-select v-model="elderUuid" placeholder="请选择老人">
            <el-option
              v-for="item in elderList"
              :key="item.elderUuid"
              :label="item.elderName"
              :value="item.elderUuid"
            >
            </el-option>
          </el-select>
        </div>
        <div class="text-area">
          <el-input
            type="textarea"
            placeholder="请输入提醒内容"
            v-model="congifure"
            :rows="10"
          />
        </div>
        <div class="setting-btn">
          <el-button type="primary" @click="addMedicine">保存</el-button>
        </div>
      </div>
      <div class="watch-tab" v-show="chooseNum === 2">
        <div class="select-box">
          <el-select v-model="mapElderUuid" placeholder="请选择">
            <el-option
              v-for="item in elderList"
              :key="item.elderUuid"
              :label="item.elderName"
              :value="item.elderUuid"
            >
            </el-option>
          </el-select>
        </div>
        <div class="map-content">
          <Map
            :latitude="latitude"
            :longitude="longitude"
            :elderUuid="mapElderUuid"
          ></Map>
        </div>
      </div>
      <div class="remind-tab" v-show="chooseNum === 3">
        <div class="name-box">张三</div>
        <div>
          <i class="el-icon-warning">跌倒警告</i>
        </div>
        <div class="remind-btn">确认</div>
      </div>
      <div class="add-tab" v-show="chooseNum === 4">
        <div class="select-box">
          <el-select v-model="addElderUuid" placeholder="请选择">
            <el-option
              v-for="item in elderList"
              :key="item.elderUuid"
              :label="item.elderName"
              :value="item.elderUuid"
            >
            </el-option>
          </el-select>
        </div>
        <el-descriptions
          class="add-info"
          direction="vertical"
          :column="2"
          border
        >
          <el-descriptions-item>
            <template slot="label"> 心率 </template>
            <input type="text" v-model="healthHeartrate" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 身高 </template>
            <input type="text" v-model="healthHeight" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 脂肪 </template>
            <input type="text" v-model="healthFat" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 血压 </template>
            <input type="text" v-model="healthBloodpressure" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 血氧 </template>
            <input type="text" v-model="healthBloodoxygen" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 睡眠 </template>
            <input type="text" v-model="healthSleep" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 体重 </template>
            <input type="text" v-model="healthWeight" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 视力 </template>
            <input type="text" v-model="healthVision" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 听力 </template>
            <input type="text" v-model="healthHear" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 肌肉率 </template>
            <input type="text" v-model="healthMuscle" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 体脂率 </template>
            <input type="text" v-model="healthBodyfat" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 内脏脂肪率</template>
            <input type="text" v-model="healthVisceralfat" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 水份率 </template>
            <input type="text" v-model="healthMoisture" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 骨量 </template>
            <input type="text" v-model="healthBonemass" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 血糖 </template>
            <input type="text" v-model="healthBloodsugar" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 尿酸 </template>
            <input type="text" v-model="healthUricacid" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 骨密度 </template>
            <input type="text" v-model="healthBonedensity" />
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 肺功能 </template>
            <input type="text" v-model="healthLungfunction" />
          </el-descriptions-item>
        </el-descriptions>
        <div class="add-btn">
          <el-button type="primary" @click="addHealty">提交</el-button>
        </div>
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
  name: "Doctor",
  components: { Map },
  data() {
    return {
      textarea: "",
      congifure: "",
      activeName: "first",
      elderList: [],
      elderUuid: "",
      mapElderUuid: "",
      addElderUuid: "",
      chooseNum: 1,
      isEdit: false,
      isHealthyEdit: false,
      medicineUuid: "",
      latitude: "", //纬度
      longitude: "", //经度
      healthBloodoxygen: "",
      healthBloodpressure: "",
      healthBloodsugar: "",
      healthBodyfat: "",
      healthBonedensity: "",
      healthBonemass: "",
      healthFat: "",
      healthHear: "",
      healthHeartrate: "",
      healthHeight: "",
      healthLungfunction: "",
      healthMoisture: "",
      healthMuscle: "",
      healthSleep: "",
      healthUricacid: "",
      healthVisceralfat: "",
      healthVision: "",
      healthWeight: "",
      elderHealthUuid: "",
      btn_list: [
        {
          num: 1,
          className: "el-icon-setting",
          value: "配置",
        },
        {
          num: 2,
          className: "el-icon-view",
          value: "监护",
        },
        {
          num: 3,
          className: "el-icon-alarm-clock",
          value: "提醒",
        },
        {
          num: 4,
          className: "el-icon-edit-outline",
          value: "添加",
        },
      ],
    };
  },
  mounted() {
    this.getOldManList();
  },
  watch: {
    elderUuid() {
      this.getMedicine();
    },
    mapElderUuid() {
      this.getPosition();
    },
    addElderUuid() {
      this.getHealth();
    },
  },
  methods: {
    jumpTab(item) {
      this.chooseNum = item.num;
    },
    getOldManList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/wme/elder`, params).then((res) => {
        const records = res.records;
        this.elderList = records;
      });
    },
    addMedicine() {
      this.getMedicine();
      if (this.isEdit) {
        let params = {
          congifure: this.congifure,
          doctorUuid: this.$route.query.doctorUuid,
          elderUuid: this.elderUuid,
          medicineUuid: this.medicineUuid,
        };
        post(`${host}/wme/elderMedicine/editElderMedicine`, params).then(
          (res) => {
            if (res) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
            }
          }
        );
      } else {
        let params = {
          congifure: this.congifure,
          doctorUuid: this.$route.query.doctorUuid,
          elderUuid: this.elderUuid,
        };
        post(`${host}/wme/elderMedicine/addElderMedicine`, params).then(
          (res) => {
            if (res) {
              this.$message({
                message: "提醒成功",
                type: "success",
              });
            }
          }
        );
      }
    },

    getMedicine() {
      get(`${host}/wme/elderMedicine/queryByElderId/${this.elderUuid}`).then(
        (res) => {
          if (res) {
            this.congifure = res.congifure;
            this.medicineUuid = res.medicineUuid;
            this.isEdit = true;
          } else {
            this.isEdit = false;
            this.congifure = "";
          }
        }
      );
    },

    getPosition() {
      get(`${host}/wme/elderPosition/queryById/${this.mapElderUuid}`).then(
        (res) => {
          if (res) {
            this.longitude = res.longitude;
            this.latitude = res.latitude;
          } else {
            this.longitude = "";
            this.latitude = "";
          }
        }
      );
    },

    addHealty() {
      this.getHealth();
      if (this.isHealthyEdit) {
        let params = {
          elderUuid: this.addElderUuid,
          healthBloodoxygen: this.healthBloodoxygen,
          healthBloodpressure: this.healthBloodpressure,
          healthBloodsugar: this.healthBloodsugar,
          healthBodyfat: this.healthBodyfat,
          healthBonedensity: this.healthBonedensity,
          healthBonemass: this.healthBonemass,
          healthFat: this.healthFat,
          healthHear: this.healthHear,
          healthHeartrate: this.healthHeartrate,
          healthHeight: this.healthHeight,
          healthLungfunction: this.healthLungfunction,
          healthMoisture: this.healthMoisture,
          healthMuscle: this.healthMuscle,
          healthSleep: this.healthSleep,
          healthUricacid: this.healthUricacid,
          healthVisceralfat: this.healthVisceralfat,
          healthVision: this.healthVision,
          healthWeight: this.healthWeight,
          elderHealthUuid: this.elderHealthUuid,
        };
        post(`${host}/wme/elderHealth/editElderHealth`, params).then((res) => {
          if (res) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          }
        });
      } else {
        let params = {
          elderUuid: this.addElderUuid,
          healthBloodoxygen: this.healthBloodoxygen,
          healthBloodpressure: this.healthBloodpressure,
          healthBloodsugar: this.healthBloodsugar,
          healthBodyfat: this.healthBodyfat,
          healthBonedensity: this.healthBonedensity,
          healthBonemass: this.healthBonemass,
          healthFat: this.healthFat,
          healthHear: this.healthHear,
          healthHeartrate: this.healthHeartrate,
          healthHeight: this.healthHeight,
          healthLungfunction: this.healthLungfunction,
          healthMoisture: this.healthMoisture,
          healthMuscle: this.healthMuscle,
          healthSleep: this.healthSleep,
          healthUricacid: this.healthUricacid,
          healthVisceralfat: this.healthVisceralfat,
          healthVision: this.healthVision,
          healthWeight: this.healthWeight,
        };
        post(`${host}/wme/elderHealth/addElderHealth`, params).then((res) => {
          if (res) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
          }
        });
      }
    },

    getHealth() {
      get(`${host}/wme/elderHealth/queryByElderId/${this.addElderUuid}`).then(
        (res) => {
          if (res) {
            (this.healthBloodoxygen = res.healthBloodoxygen),
              (this.healthBloodpressure = res.healthBloodpressure),
              (this.healthBloodsugar = res.healthBloodsugar),
              (this.healthBodyfat = res.healthBodyfat),
              (this.healthBonedensity = res.healthBonedensity),
              (this.healthBonemass = res.healthBonemass),
              (this.healthFat = res.healthFat),
              (this.healthHear = res.healthHear),
              (this.healthHeartrate = res.healthHeartrate),
              (this.healthHeight = res.healthHeight),
              (this.healthLungfunction = res.healthLungfunction),
              (this.healthMoisture = res.healthMoisture),
              (this.healthMuscle = res.healthMuscle),
              (this.healthSleep = res.healthSleep),
              (this.healthUricacid = res.healthUricacid),
              (this.healthVisceralfat = res.healthVisceralfat),
              (this.healthVision = res.healthVision),
              (this.healthWeight = res.healthWeight),
              (this.elderHealthUuid = res.elderHealthUuid);
            this.isHealthyEdit = true;
          } else {
            this.isHealthyEdit = false;
            this.healthBloodoxygen = "";
            this.healthBloodpressure = "";
            this.healthBloodsugar = "";
            this.healthBodyfat = "";
            this.healthBonedensity = "";
            this.healthBonemass = "";
            this.healthFat = "";
            this.healthHear = "";
            this.healthHeartrate = "";
            this.healthHeight = "";
            this.healthLungfunction = "";
            this.healthMoisture = "";
            this.healthMuscle = "";
            this.healthSleep = "";
            this.healthUricacid = "";
            this.healthVisceralfat = "";
            this.healthVision = "";
            this.healthWeight = "";
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.doctor-box {
  width: 375px;
  .tab-content {
    padding: 10px;
    .select-box {
      display: flex;
      justify-content: center;
    }
    .setting-tab {
      .text-area {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .el-textarea__inner {
          height: 200px !important;
          border: 1px solid #409eff;
        }
      }
      .setting-btn {
        display: flex;
        justify-content: center;
        margin-top: 100px;
      }
    }
    .watch-tab {
      .map-content {
        margin-top: 20px;
        height: 500px;
        width: 100%;
      }
    }
    .remind-tab {
      .name-box {
        // width: 300px;
        height: 50px;
        background-color: #e8e8e8;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 50px;
        color: #333;
      }
      .el-icon-warning {
        font-size: 30px;
        color: red;
        display: flex;
        justify-content: center;
        margin-top: 50px;
      }
      .remind-btn {
        height: 200px;
        width: 200px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 100px auto 0;
        text-align: center;
        background-color: #409eff;
        color: #fff;
        font-size: 30px;
      }
    }
    .add-tab {
      .select-box {
        display: flex;
        justify-content: center;
      }
      .add-info {
        margin-top: 20px;
        width: 375px;
        height: 450px;
        overflow: scroll;
      }
      .add-btn {
        display: flex;
        justify-content: center;
        margin-top: 20px;
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
    .el-icon-setting,
    .el-icon-view,
    .el-icon-alarm-clock,
    .el-icon-edit-outline {
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