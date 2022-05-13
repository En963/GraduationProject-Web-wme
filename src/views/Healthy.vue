<template>
  <div class="healthy-box">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="elderName" label="老人姓名" width="200">
      </el-table-column>
      <el-table-column prop="healthHeight" label="身高" width="200">
      </el-table-column>
      <el-table-column prop="healthWeight" label="体重" width="200">
      </el-table-column>
      <el-table-column prop="healthBloodpressure" label="血压" width="200">
      </el-table-column>
      <el-table-column prop="healthBloodsugar" label="血糖" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="findHealthy(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template slot="label"> 老人姓名 </template>
          {{ queryHealthy.elderName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 身高 </template>
          {{ queryHealthy.healthHeight }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 体重 </template>
          {{ queryHealthy.healthWeight }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 心率 </template>
          {{ queryHealthy.healthHeartrate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 脂肪 </template>
          {{ queryHealthy.healthFat }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 血压 </template>
          {{ queryHealthy.healthBloodpressure }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 血氧 </template>
          {{ queryHealthy.healthBloodoxygen }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 睡眠 </template>
          {{ queryHealthy.healthSleep }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 视力 </template>
          {{ queryHealthy.healthVision }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 听力 </template>
          {{ queryHealthy.healthHear }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 肌肉率 </template>
          {{ queryHealthy.healthMuscle }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 体脂率 </template>
          {{ queryHealthy.healthBodyfat }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 内脏脂肪率 </template>
          {{ queryHealthy.healthVisceralfat }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 水份率 </template>
          {{ queryHealthy.healthMoisture }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 骨量 </template>
          {{ queryHealthy.healthBonemass }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 血糖 </template>
          {{ queryHealthy.healthBloodsugar }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 尿酸 </template>
          {{ queryHealthy.healthUricacid }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 骨密度 </template>
          {{ queryHealthy.healthBonedensity }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 肺功能 </template>
          {{ queryHealthy.healthLungfunction }}
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get } from "../tools/request";
export default {
  name: "Healthy",
  data() {
    return {
      tableData: [],
      elderList: [],
      dialogVisible: false,
      queryHealthy: {},
    };
  },
  created() {
    this.getOldManList();
    this.getHealthyList();
  },
  methods: {
    getOldManList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get("http://192.168.31.114:8089/wme/elder", params).then((res) => {
        const records = res.records;
        this.elderList = records;
      });
    },

    getHealthyList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get("http://192.168.31.114:8089/wme/elderHealth", params).then((res) => {
        if (res) {
          const records = res.records;
          this.tableData = records;
          this.tableData.map((item) => {
            this.elderList.map((items) => {
              if (item.elderUuid === items.elderUuid) {
                item.elderName = items.elderName;
              }
            });
          });
        }
      });
    },
    findHealthy(index, row) {
      this.dialogVisible = true;
      get(
        `http://192.168.31.114:8089/wme/elderHealth/queryById/${this.tableData[index].elderHealthUuid}`
      ).then((res) => {
        this.queryHealthy = res;
        this.queryHealthy.elderName = this.tableData[index].name;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.healthy-box {
  padding: 10px;
}
</style>