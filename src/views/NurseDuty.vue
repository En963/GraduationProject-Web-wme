<template>
  <div class="nurse-duty-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="doctorName" label="值班人" width="150">
      </el-table-column>
      <el-table-column prop="schedule" label="值班时间" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findSchedule(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editSchedule(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteSchedule(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写值班信息" :visible.sync="dialogVisible" width="20%">
      <el-form :label-position="'left'">
        <el-form-item label="护理人员">
          <el-select v-model="doctorUuid" placeholder="请选择护理人员">
            <el-option
              v-for="item in nurseList"
              :key="item.id"
              :label="item.doctorName"
              :value="item.doctorUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值班时间">
          <el-select v-model="schedule" placeholder="请选择值班时间">
            <el-option
              v-for="item in week"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDoctorSchedule">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="值班信息" :visible.sync="showQueryDialog" width="20%">
      <el-form :label-position="'left'">
        <el-form-item label="护理人员">
          <el-select
            v-model="querySchedule.doctorUuid"
            placeholder="请选择护理人员"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in nurseList"
              :key="item.doctorUuid"
              :label="item.doctorName"
              :value="item.doctorUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值班时间">
          <el-select
            v-model="querySchedule.schedule"
            placeholder="请选择值班时间"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in week"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="isEdit" @click="showQueryDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmSchedule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, post, deleteFn } from "../tools/request";
export default {
  name: "NurseDuty",
  data() {
    return {
      nurseList: [],
      tableData: [],
      dialogVisible: false,
      doctorUuid: "",
      week: [
        {
          value: 1,
          name: "周一",
        },
        {
          value: 2,
          name: "周二",
        },
        {
          value: 3,
          name: "周三",
        },
        {
          value: 4,
          name: "周四",
        },
        {
          value: 5,
          name: "周五",
        },
        {
          value: 6,
          name: "周六",
        },
        {
          value: 7,
          name: "周日",
        },
      ],
      schedule: "",
      showQueryDialog: false,
      isDisable: true,
      isEdit: false,
      querySchedule: {},
    };
  },
  mounted() {
    this.getNurseList();
    this.getDoctorSchedule();
  },
  methods: {
    getNurseList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get("http://192.168.31.114:8089/wme/doctor", params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.nurseList = records;
        }
      });
    },
    //添加日程
    addDoctorSchedule() {
      let params = {
        doctorUuid: this.doctorUuid,
        schedule: this.schedule,
      };
      post(
        "http://192.168.31.114:8089/wme/doctorSchedule/addDoctorSchedule",
        params
      ).then((res) => {
        if (res.id) {
          this.dialogVisible = false;
          this.getDoctorSchedule();
        }
      });
    },

    getDoctorSchedule() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get("http://192.168.31.114:8089/wme/doctorSchedule", params).then(
        (res) => {
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
        }
      );
    },

    findSchedule(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQuerySchedule(index);
    },

    getQuerySchedule(index) {
      get(
        `http://192.168.31.114:8089/wme/doctorSchedule/queryById/${this.tableData[index].doctorUuid}`
      ).then((res) => {
        this.querySchedule = res;
        this.showQueryDialog = true;
      });
    },
    editSchedule(index, row) {
      this.getQuerySchedule(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmSchedule() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(
          "http://192.168.31.114:8089/wme/doctorSchedule/editDoctorSchedule",
          this.queryNurse
        ).then((res) => {
          if (res.id) {
            this.getDoctorSchedule();
          }
        });
      }
    },
    deleteSchedule(index, row) {
      deleteFn(
        `http://192.168.31.114:8089/wme/doctorSchedule?uuid=${this.tableData[index].doctorUuid}`
      ).then((res) => {
        if (res) {
          this.getDoctorSchedule();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nurse-duty-box {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
}
</style>