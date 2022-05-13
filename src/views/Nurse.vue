<template>
  <div class="nurse-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="doctorName" label="护理姓名" width="150">
      </el-table-column>
      <el-table-column prop="doctorPhone" label="联系方式" width="200">
      </el-table-column>
      <el-table-column prop="doctorCardid" label="身份证号" width="200">
      </el-table-column>
      <el-table-column prop="doctorSex" label="性别" width="50">
      </el-table-column>
      <el-table-column prop="doctorAge" label="年龄" width="150">
      </el-table-column>
      <el-table-column prop="agencyName" label="所在机构" width="150">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findNurse(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editAgency(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteAgency(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="填写护理人员信息"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :label-position="'left'">
        <el-form-item label="护理姓名">
          <el-input v-model="doctorName"></el-input>
        </el-form-item>
        <el-form-item label="护理年龄">
          <el-input v-model="doctorAge"></el-input>
        </el-form-item>
        <el-form-item label="护理联系方式">
          <el-input v-model="doctorPhone"></el-input>
        </el-form-item>
        <el-form-item label="护理身份证号">
          <el-input v-model="doctorCardid"></el-input>
        </el-form-item>
        <el-form-item label="护理性别">
          <el-input v-model="doctorSex"></el-input>
        </el-form-item>
        <el-form-item label="护理所在机构">
          <el-select v-model="agencyUuid" placeholder="请选择机构类型">
            <el-option
              v-for="item in agencyList"
              :key="item.id"
              :label="item.agencyName"
              :value="item.agencyUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNurse">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="护理人员信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="护理姓名">
          <el-input
            v-model="queryNurse.doctorName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理年龄">
          <el-input
            v-model="queryNurse.doctorAge"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理联系方式">
          <el-input
            v-model="queryNurse.doctorPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理身份证号">
          <el-input
            v-model="queryNurse.doctorCardid"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理性别">
          <el-input
            v-model="queryNurse.doctorSex"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理所在机构">
          <el-select
            v-model="queryNurse.agencyUuid"
            placeholder="请选择机构类型"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in agencyList"
              :key="item.agencyUuid"
              :label="item.agencyName"
              :value="item.agencyUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="isEdit" @click="showQueryDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmNurse">确 定</el-button>
      </span>
    </el-dialog>

    <Pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="totalNum"
      @change-pagesize="changePageSize"
      @change-currentpage="changeCurrentPage"
    />
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import { get, post, deleteFn } from "../tools/request";
export default {
  name: "Nurse",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      doctorAge: "",
      doctorCardid: "",
      doctorName: "",
      doctorPhone: "",
      doctorSex: "",
      agencyUuid: "",
      currentPage: 1,
      pageSize: 5,
      totalNum: 0,
      dialogVisible: false, //展示添加弹窗
      typeOptions: [
        {
          value: 1,
          name: "城区",
        },
        {
          value: 2,
          name: "郊区",
        },
        {
          value: 3,
          name: "农村",
        },
        {
          value: 4,
          name: "风景区",
        },
      ],
      agencyList: [],
      queryNurse: {},
      showQueryDialog: false,
      isDisable: true,
      isEdit: false,
    };
  },
  mounted() {
    this.getAgencyList();
    this.getNurseList();
  },
  watch: {
    currentPage() {
      this.getNurseList();
    },
  },
  methods: {
    changePageSize(data) {
      console.log(data);
      this.pageSize = data;
    },
    changeCurrentPage(data) {
      console.log(data);
      this.currentPage = data;
    },
    addNurse() {
      console.log("adasd", this.agencyUuid);
      let params = {
        doctorAge: this.doctorAge,
        doctorCardid: this.doctorCardid,
        doctorName: this.doctorName,
        doctorPhone: this.doctorPhone,
        doctorSex: this.doctorSex,
        agencyUuid: this.agencyUuid,
      };
      post("http://192.168.31.114:8089/wme/doctor/addDoctor", params).then(
        (res) => {
          if (res.id) {
            this.dialogVisible = false;
            this.getNurseList();
          }
        }
      );
    },

    //获取机构列表
    getAgencyList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get("http://192.168.31.114:8089/wme/agency", params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.agencyList = records;
        }
      });
    },

    getNurseList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get("http://192.168.31.114:8089/wme/doctor", params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.tableData = records;
          this.tableData.map((item) => {
            this.agencyList.map((items) => {
              if (item.agencyUuid === items.agencyUuid) {
                item.agencyName = items.agencyName;
              }
            });
          });
          this.totalNum = res.total;
        }
      });
    },

    deleteAgency(index, row) {
      deleteFn(
        `http://192.168.31.114:8089/wme/doctor?uuid=${this.tableData[index].doctorUuid}`
      ).then((res) => {
        if (res) {
          this.getNurseList();
        }
      });
    },

    findNurse(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryNurse(index);
    },

    getQueryNurse(index) {
      get(
        `http://192.168.31.114:8089/wme/doctor/queryById/${this.tableData[index].doctorUuid}`
      ).then((res) => {
        this.queryNurse = res;
        this.showQueryDialog = true;
      });
    },

    editAgency(index, row) {
      this.getQueryNurse(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmNurse() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(
          "http://192.168.31.114:8089/wme/doctor/editDoctor",
          this.queryNurse
        ).then((res) => {
          if (res.id) {
            this.getNurseList();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nurse-box {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>