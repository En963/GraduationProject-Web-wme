<template>
  <div class="visit-list">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-row class="testbox">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column
          align="center"
          prop="elderName"
          label="老人姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitName"
          label="来访人姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitPhone"
          label="联系电话"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitRelation"
          label="与老人关系"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitReason"
          label="来访缘由"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitTime"
          label="来访时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="leaveTime"
          label="离开时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="visitRemark"
          label="备注"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="small" @click="findVisit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="editVisit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteVisit(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="填写来访信息" :visible.sync="dialogVisible" width="40%">
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
        <el-form-item label="来访人姓名">
          <el-input v-model="visitName"></el-input>
        </el-form-item>
        <el-form-item label="陪同人员电话">
          <el-input v-model="visitPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="visitRelation"></el-input>
        </el-form-item>
        <el-form-item label="来访缘由">
          <el-input v-model="visitReason"></el-input>
        </el-form-item>
        <el-form-item label="来访时间">
          <el-input v-model="visitTime"></el-input>
        </el-form-item>
        <el-form-item label="离开时间">
          <el-input v-model="leaveTime"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="visitRemark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="来访信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="老人姓名">
          <el-select
            v-model="queryVisit.elderUuid"
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
        <el-form-item label="来访人姓名">
          <el-input
            v-model="queryVisit.visitName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="陪同人员电话">
          <el-input
            v-model="queryVisit.visitPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            v-model="queryVisit.visitRelation"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="来访缘由">
          <el-input
            v-model="queryVisit.visitReason"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="来访时间">
          <el-input
            v-model="queryVisit.visitTime"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="离开时间">
          <el-input
            v-model="queryVisit.leaveTime"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="queryVisit.visitRemark"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQueryDialog = false" v-show="isEdit"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmVisit">确 定</el-button>
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
import { get, post, deleteFn, host } from "../tools/request";
export default {
  name: "VisitList",
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
      visitName: "",
      visitPhone: "",
      visitReason: "",
      visitRelation: "",
      visitRemark: "",
      visitTime: "",
      leaveTime: "",
      queryVisit: {},
      isEdit: false,
      isDisable: false,
    };
  },
  created() {
    this.getOldManList();
    this.getVisit();
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
      get(`${host}/wme/elder`, params).then((res) => {
        const records = res.records;
        this.elderList = records;
      });
    },

    getVisit() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get(`${host}/wme/elderVisit`, params).then((res) => {
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

    addVisit() {
      let params = {
        elderUuid: this.elderUuid,
        visitName: this.visitName,
        visitPhone: this.visitPhone,
        visitReason: this.visitReason,
        visitRelation: this.visitRelation,
        visitRemark: this.visitRemark,
        visitTime: this.visitTime,
        leaveTime: this.leaveTime,
      };
      post(`${host}/wme/elderVisit/addElderVisit`, params).then((res) => {
        if (res.id) {
          this.dialogVisible = false;
          this.getVisit();
        }
      });
    },

    findVisit(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryVisit(index);
    },

    getQueryVisit(index) {
      get(
        `${host}/wme/elderVisit/queryById/${this.tableData[index].elderVisitUuid}`
      ).then((res) => {
        this.queryVisit = res;
        this.showQueryDialog = true;
      });
    },

    editVisit(index, row) {
      this.getQueryVisit(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmVisit() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(`${host}/wme/elderVisit/editElderVisit`, this.queryVisit).then(
          (res) => {
            if (res.id) {
              this.getVisit();
            }
          }
        );
      }
    },
    deleteVisit(index, row) {
      deleteFn(
        `${host}/wme/elderVisit?uuid=${this.tableData[index].elderVisitUuid}`
      ).then((res) => {
        if (res) {
          this.getVisit();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.visit-list {
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