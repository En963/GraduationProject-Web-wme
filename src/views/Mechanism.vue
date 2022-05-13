<template>
  <div class="mechanism-box">
    <div class="btn-group">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="agencyName" label="机构名称" width="300">
      </el-table-column>
      <el-table-column prop="agencyPhone" label="机构电话" width="300">
      </el-table-column>
      <el-table-column prop="agencyAddress" label="机构地址" width="300">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="findAgency(scope.$index, scope.row)"
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

    <el-dialog title="填写机构信息" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="机构名称">
          <el-input v-model="agencyName"></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input v-model="agencyAddress"></el-input>
        </el-form-item>
        <el-form-item label="机构电话">
          <el-input v-model="agencyPhone"></el-input>
        </el-form-item>
        <el-form-item label="机构方位">
          <el-input v-model="agencyLocation"></el-input>
        </el-form-item>
        <el-form-item label="机构图片">
          <input
            v-if="agencyPicture === ''"
            type="file"
            accept="image/*"
            @change="getImg"
          />
          <div class="picture-box" v-else>
            <img :src="agencyPicture" alt="" />
            <el-button @click="agencyPicture = ''">替换</el-button>
          </div>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="agencyType" placeholder="请选择机构类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAgency">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="机构信息" :visible.sync="showQueryDialog" width="40%">
      <el-form :label-position="'left'">
        <el-form-item label="机构名称">
          <el-input
            v-model="queryAgency.agencyName"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input
            v-model="queryAgency.agencyAddress"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="机构电话">
          <el-input
            v-model="queryAgency.agencyPhone"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="机构方位">
          <el-input
            v-model="queryAgency.agencyLocation"
            :disabled="isDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="机构图片">
          <input
            v-if="queryAgency.agencyPicture === ''"
            type="file"
            accept="image/*"
            @change="getImg"
          />
          <div class="picture-box" v-else>
            <img :src="queryAgency.agencyPicture" alt="" />
            <el-button
              @click="queryAgency.agencyPicture = ''"
              :disabled="isDisable"
              >替换</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select
            v-model="queryAgency.agencyType"
            placeholder="请选择机构类型"
            :disabled="isDisable"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="isEdit" @click="showQueryDialog = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmAgency">确 定</el-button>
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
  name: "Mechanism",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      agencyAddress: "",
      agencyLocation: 0,
      agencyName: "",
      agencyPhone: "",
      agencyPicture: "",
      agencyType: 1,
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
      queryAgency: {},
      showQueryDialog: false,
      isDisable: true,
      isEdit: false,
    };
  },
  mounted() {
    this.getAgencyList();
  },
  watch: {
    currentPage() {
      this.getAgencyList();
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
    addAgency() {
      let params = {
        agencyAddress: this.agencyAddress,
        agencyLocation: this.agencyLocation,
        agencyName: this.agencyName,
        agencyPhone: this.agencyPhone,
        agencyPicture: this.agencyPicture,
        agencyType: this.agencyType,
      };
      post(`${host}/wme/agency/addAgency`, params).then((res) => {
        if (res.id) {
          this.dialogVisible = false;
          this.getAgencyList();
        }
      });
    },

    //获取机构列表
    getAgencyList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      };
      get(`${host}/wme/agency`, params).then((res) => {
        if (res.records) {
          const records = res.records;
          this.tableData = records;
          this.totalNum = res.total;
        }
      });
    },

    deleteAgency(index, row) {
      deleteFn(
        `${host}/wme/agency?uuid=${this.tableData[index].agencyUuid}`
      ).then((res) => {
        if (res) {
          this.getAgencyList();
        }
      });
    },

    findAgency(index, row) {
      this.isEdit = false;
      this.isDisable = true;
      this.getQueryAgency(index);
    },

    getQueryAgency(index) {
      get(
        `${host}/wme/agency/queryById/${this.tableData[index].agencyUuid}`
      ).then((res) => {
        this.queryAgency = res;
        this.showQueryDialog = true;
      });
      console.log("this.queryAgency", this.queryAgency);
    },

    editAgency(index, row) {
      this.getQueryAgency(index);
      this.isEdit = true;
      this.isDisable = false;
    },
    confirmAgency() {
      this.showQueryDialog = false;
      if (this.isEdit) {
        post(`${host}/wme/agency/editAgency`, this.queryAgency).then((res) => {
          if (res.id) {
            this.getAgencyList();
          }
        });
      }
    },
    getImg(e) {
      var file = e.target.files;
      console.log(file);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file[0]);
      fileReader.onload = (res) => {
        const imgTemp = this.base64ImgtoFile(res.target.result);
        console.log(
          window.webkitURL.createObjectURL(imgTemp) ||
            window.URL.createObjectURL(imgTemp)
        );
        if (this.isEdit) {
          this.queryAgency.agencyPicture =
            window.webkitURL.createObjectURL(imgTemp) ||
            window.URL.createObjectURL(imgTemp);
        } else {
          this.agencyPicture =
            window.webkitURL.createObjectURL(imgTemp) ||
            window.URL.createObjectURL(imgTemp);
        }
      };
    },

    base64ImgtoFile(dataurl, filename = "file") {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const suffix = mime.split("/")[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mechanism-box {
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .picture-box {
    display: flex;
    align-items: center;
    img {
      width: 200px;
      margin-right: 20px;
    }
  }
}
</style>