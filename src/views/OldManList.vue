<template>
  <div class="old-list">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column
        align="center"
        prop="elderName"
        label="老人姓名"
        width="200"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="elderGender"
        label="性别"
        width="100"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="elderCardid"
        label="身份证号码"
        width="200"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="elderPhone"
        label="老人联系方式"
        width="200"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="elderTypeName"
        label="老人类型"
        width="150"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findElder(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editElder(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteElder(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写老人信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="姓名">
          <el-input v-model="elderName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="elderAddress"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="elderAge"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="elderCardid"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="elderData"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="elderGender"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-input v-model="elderMarriage"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="elderNation"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="elderPhone"></el-input>
        </el-form-item>
        <el-form-item label="家庭人口">
          <el-input v-model="elderPopulation"></el-input>
        </el-form-item>
        <el-form-item label="居住类型">
          <el-radio-group v-model="elderType">
            <el-radio v-model="elderType" :label="0">社区</el-radio>
            <el-radio v-model="elderType" :label="1">机构</el-radio>
          </el-radio-group>
          <el-select
            v-show="elderType === 1"
            v-model="agencyUuid"
            placeholder="请选择机构类型"
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addElder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="老人信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="姓名">
          <el-input
            v-model="queryElder.elderName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="queryElder.elderAddress"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="queryElder.elderAge"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="queryElder.elderCardid"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input
            v-model="queryElder.elderData"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            v-model="queryElder.elderGender"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-input
            v-model="queryElder.elderMarriage"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input
            v-model="queryElder.elderNation"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="queryElder.elderPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭人口">
          <el-input
            v-model="queryElder.elderPopulation"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="居住类型">
          <el-radio-group v-model="queryElder.elderType">
            <el-radio
              v-model="queryElder.elderType"
              :label="'0'"
              :disabled="isDisable"
              >社区</el-radio
            >
            <el-radio
              v-model="queryElder.elderType"
              :label="'1'"
              :disabled="isDisable"
              >机构</el-radio
            >
          </el-radio-group>
          <el-select
            v-show="queryElder.elderType === '1'"
            v-model="agencyUuid"
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
        <el-button type="primary" @click="confirmElder">确 定</el-button>
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
  name: "OldManList",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      totalNum: 0,
      elderName: "",
      elderAddress: "",
      elderAge: "",
      elderCardid: "",
      elderData: "",
      elderGender: "",
      elderMarriage: "",
      elderNation: "",
      elderPhone: "",
      elderPopulation: "",
      elderType: 0,
      elderUuid: "",
      agencyUuid: "",
      agencyList: [],
      dialogVisible: false,
      isDisable: false,
      isEdit: false,
      queryElder: {},
      showQueryDialog: false,
    };
  },
  mounted() {
    this.getAgencyList();
    this.getOldManList();
  },
  methods: {
    changePageSize(data) {
      this.pageSize = data;
    },
    changeCurrentPage(data) {
      this.currentPage = data;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },

    //获取机构列表
    getAgencyList() {
      let params = {
        pageNo: 0,
        pageSize: 0,
      };
      get(`${host}/wme/agency`, params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.agencyList = records;
        }
      });
    },
    getOldManList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get(`${host}/wme/elder`, params).then((res) => {
        const records = res.records;
        this.tableData = records;
        this.tableData.map((item) => {
          if (item.elderType === "0") {
            item.elderTypeName = "社区";
          } else if (item.elderType === "1") {
            item.elderTypeName = "机构";
          }
        });
        this.totalNum = res.total;
      });
    },

    addElder() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        elderName: this.elderName,
        elderAddress: this.elderAddress,
        elderAge: this.elderAge,
        elderCardid: this.elderCardid,
        elderData: this.elderData,
        elderGender: this.elderGender,
        elderMarriage: this.elderMarriage,
        elderNation: this.elderNation,
        elderPhone: this.elderPhone,
        elderPopulation: this.elderPopulation,
        elderType: this.elderType,
      };
      post(`${host}/wme/elder/addElder`, params).then((res) => {
        if (res.id) {
          if (this.elderType === 1) {
            const elderUuid = res.elderUuid;
            let params = {
              elderUuid: elderUuid,
              agencyUuid: this.agencyUuid,
            };
            post(
              `${host}/wme/elderAgencyRelation/addElderAgencyRelation`,
              params
            ).then((res) => {});
          }
          this.dialogVisible = false;
          this.getOldManList();
        }
      });
    },

    getQueryElder(index) {
      get(
        `${host}/wme/elder/queryById/${this.tableData[index].elderUuid}`
      ).then((res) => {
        this.queryElder = res;
        if (res.elderType === "1") {
          get(
            `${host}/wme/elderAgencyRelation/queryByElderId/${this.tableData[index].elderUuid}`
          ).then((res) => {});
        }
        this.showQueryDialog = true;
      });
    },

    findElder(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryElder(index);
    },
    confirmElder() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        this.queryElder.elderType = parseInt(this.queryElder.elderType);
        post(`${host}/wme/elder/editElder`, this.queryElder).then((res) => {
          if (res.id) {
            if (this.queryElder.elderType === 1) {
              const elderUuid = res.elderUuid;
              let params = {
                elderUuid: elderUuid,
                agencyUuid: this.agencyUuid,
              };
              post(
                `${host}/wme/elderAgencyRelation/addElderAgencyRelation`,
                params
              ).then((res) => {});
            }
            this.getOldManList();
          }
        });
      }
    },
    editElder(index, row) {
      this.isEdit = true;
      this.isDisable = false;
      this.getQueryElder(index);
    },
    deleteElder(index) {
      deleteFn(
        `${host}/wme/elder?uuid=${this.tableData[index].elderUuid}`
      ).then((res) => {
        if (res) {
          this.getOldManList();
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.old-list {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>