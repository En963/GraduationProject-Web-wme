<template>
  <div class="complaint-box">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="doctorName" label="被投诉人" width="150">
      </el-table-column>
      <el-table-column prop="complaintDescribe" label="投诉信息" width="200">
      </el-table-column>
      <el-table-column prop="complaintTime" label="投诉时间" width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { get, post, deleteFn, host } from "../tools/request";
export default {
  name: "Complaint",
  data() {
    return {
      nurseList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  mounted() {
    this.getNurseList();
    this.getComplaint();
  },
  methods: {
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
    getComplaint() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get(`${host}/wme/elderComplaint`, params).then((res) => {
        if (res) {
          const records = res.records;
          this.tableData = records;
          this.tableData.map((item) => {
            this.nurseList.map((items) => {
              if (item.agencyUuid === items.doctorUuid) {
                item.doctorName = items.doctorName;
              }
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.complaint-box {
  // padding: 10px;
  margin: 10px auto;
}
</style>