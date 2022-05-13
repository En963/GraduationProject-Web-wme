<template>
  <div class="out-list">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-row class="testbox">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column
          align="center"
          prop="elderName"
          label="老人姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="gooutName"
          label="陪同人员姓名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="gooutPhone"
          label="陪同人员电话"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="gooutTime"
          label="外出时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="goinPlanTime"
          label="计划返回时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="goinTime"
          label="实际返回时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="gooutReason"
          label="外出原因"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="goinFlag"
          label="是否已返回"
          width="100"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="small" @click="findOut(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="editOut(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteOut(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="填写外出信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="老人姓名">
          <el-select v-model="elderUuid" placeholder="请选择外出的老人">
            <el-option
              v-for="item in elderList"
              :key="item.elderUuid"
              :label="item.elderName"
              :value="item.elderUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="陪同人员姓名">
          <el-input v-model="gooutName"></el-input>
        </el-form-item>
        <el-form-item label="陪同人员电话">
          <el-input v-model="gooutPhone"></el-input>
        </el-form-item>
        <el-form-item label="外出时间">
          <el-input v-model="gooutTime"></el-input>
        </el-form-item>
        <el-form-item label="计划返回时间">
          <el-input v-model="goinPlanTime"></el-input>
        </el-form-item>
        <el-form-item label="实际返回时间">
          <el-input v-model="goinTime"></el-input>
        </el-form-item>
        <el-form-item label="外出原因">
          <el-input v-model="gooutReason"></el-input>
        </el-form-item>
        <el-form-item label="是否已返回">
          <el-input v-model="goinFlag"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOut">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="填写外出信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="老人姓名">
          <el-select
            v-model="queryOut.elderUuid"
            placeholder="请选择外出的老人"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in elderList"
              :key="item.elderUuid"
              :label="item.elderName"
              :value="item.elderUuid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="陪同人员姓名">
          <el-input
            v-model="queryOut.gooutName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="陪同人员电话">
          <el-input
            v-model="queryOut.gooutPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="外出时间">
          <el-input
            v-model="queryOut.gooutTime"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="计划返回时间">
          <el-input
            v-model="queryOut.goinPlanTime"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="实际返回时间">
          <el-input
            v-model="queryOut.goinTime"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="外出原因">
          <el-input
            v-model="queryOut.gooutReason"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否已返回">
          <el-input
            v-model="queryOut.goinFlag"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryDialog = false" v-show="isEdit"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmOut">确 定</el-button>
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
  name: "OutList",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      totalNum: 0,
      elderList: [],
      dialogVisible: false,
      showQueryDialog: false,
      elderUuid: "",
      gooutName: "",
      gooutPhone: "",
      gooutTime: "",
      goinPlanTime: "",
      goinTime: "",
      gooutReason: "",
      goinFlag: "",
      queryOut: {},
      isEdit: false,
      isDisable: false,
    };
  },
  created() {
    this.getOldManList();
    this.getOut();
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

    getOut() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get("http://192.168.31.114:8089/wme/elderGoout", params).then((res) => {
        const records = res.records;
        this.tableData = records;
        this.tableData.map((item) => {
          this.elderList.map((items) => {
            if (item.elderUuid === items.elderUuid) {
              item.elderName = items.elderName;
            }
          });
        });
      });
    },

    addOut() {
      let params = {
        elderUuid: this.elderUuid,
        gooutName: this.gooutName,
        gooutPhone: this.gooutPhone,
        gooutTime: this.gooutTime,
        goinPlanTime: this.goinPlanTime,
        goinTime: this.goinTime,
        gooutReason: this.gooutReason,
        goinFlag: this.goinFlag,
      };
      post(
        "http://192.168.31.114:8089/wme/elderGoout/addElderGoout",
        params
      ).then((res) => {
        if (res.id) {
          this.dialogVisible = false;
          this.getOut();
        }
      });
    },

    findOut(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryOut(index);
    },

    getQueryOut(index) {
      get(
        `http://192.168.31.114:8089/wme/elderGoout/queryById/${this.tableData[index].elderGooutUuid}`
      ).then((res) => {
        this.queryOut = res;
        this.showQueryDialog = true;
      });
    },

    editOut(index, row) {
      this.getQueryOut(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmOut() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(
          "http://192.168.31.114:8089/wme/elderGoout/editElderGoout",
          this.queryOut
        ).then((res) => {
          if (res.id) {
            this.getOut();
          }
        });
      }
    },
    deleteOut(index, row) {
      deleteFn(
        `http://192.168.31.114:8089/wme/elderGoout?uuid=${this.tableData[index].elderGooutUuid}`
      ).then((res) => {
        if (res) {
          this.getOut();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.out-list {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .testbox {
    width: 1200px;
    /deep/ .el-table--scrollable-x .el-table__body-wrapper {
      overflow: auto !important;
    }
    /deep/.el-table__fixed-right-patch {
      background-color: #f5f7fa !important;
    }
  }
}
</style>