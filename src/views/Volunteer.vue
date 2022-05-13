<template>
  <div class="volunteer-box">
    <div class="volunteer-btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="volunteerName" label="志愿者姓名" width="150">
      </el-table-column>
      <el-table-column prop="volunteerAge" label="年龄" width="150">
      </el-table-column>
      <el-table-column prop="volunteerCardid" label="身份证号" width="200">
      </el-table-column>
      <el-table-column prop="volunteerGender" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="volunteerPhone" label="联系方式" width="200">
      </el-table-column>
      <el-table-column prop="volunteerDescribe" label="志愿描述" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" width="270">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="findVolunteer(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="editVolunteer(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteVolunteer(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写机构信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="志愿者姓名">
          <el-input v-model="volunteerName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="volunteerCardid"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="volunteerAge"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="volunteerGender"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="volunteerPhone"></el-input>
        </el-form-item>
        <el-form-item label="志愿描述">
          <el-input v-model="volunteerDescribe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVolunteer">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="机构信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="志愿者姓名">
          <el-input
            v-model="queryVolunteer.volunteerName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="queryVolunteer.volunteerCardid"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="queryVolunteer.volunteerAge"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            v-model="queryVolunteer.volunteerGender"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="queryVolunteer.volunteerPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="志愿描述">
          <el-input
            v-model="queryVolunteer.volunteerDescribe"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="isEdit" @click="showQueryDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmVolunteer">确 定</el-button>
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
  name: "Volunteer",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      volunteerCardid: "",
      volunteerGender: "",
      volunteerName: "",
      volunteerAge: "",
      volunteerPhone: "",
      volunteerDescribe: "",
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
      queryVolunteer: {},
      showQueryDialog: false,
      isDisable: true,
      isEdit: false,
    };
  },
  mounted() {
    this.getVolunteerList();
  },
  watch: {
    currentPage() {
      this.getVolunteerList();
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
    addVolunteer() {
      let params = {
        volunteerCardid: this.volunteerCardid,
        volunteerGender: this.volunteerGender,
        volunteerName: this.volunteerName,
        volunteerAge: this.volunteerAge,
        volunteerPhone: this.volunteerPhone,
        volunteerDescribe: this.volunteerDescribe,
      };
      post(`${host}/wme/volunteer/addVolunteer`, params).then((res) => {
        if (res.id) {
          this.dialogVisible = false;
          this.getVolunteerList();
        }
      });
    },

    //获取机构列表
    getVolunteerList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get(`${host}/wme/volunteer`, params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.tableData = records;
          this.totalNum = res.total;
        }
      });
    },

    deleteVolunteer(index, row) {
      deleteFn(
        `${host}/wme/volunteer?uuid=${this.tableData[index].volunteerUuid}`
      ).then((res) => {
        if (res) {
          this.getVolunteerList();
        }
      });
    },

    findVolunteer(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryVolunteer(index);
    },

    getQueryVolunteer(index) {
      get(
        `${host}/wme/volunteer/queryById/${this.tableData[index].volunteerUuid}`
      ).then((res) => {
        this.queryVolunteer = res;
        this.showQueryDialog = true;
      });
      console.log("this.queryVolunteer", this.queryVolunteer);
    },

    editVolunteer(index, row) {
      this.getQueryVolunteer(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmVolunteer() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(`${host}/wme/volunteer/editVolunteer`, this.queryVolunteer).then(
          (res) => {
            if (res.id) {
              this.getVolunteerList();
            }
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.volunteer-box {
  padding: 10px;
  .volunteer-btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>
