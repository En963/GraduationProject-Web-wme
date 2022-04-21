<template>
  <div class="out-list">
    <el-form :inline="true" :model="filterData" class="screen-box" size="mini">
      <el-form-item label="老人姓名">
        <el-input v-model="filterData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="filterData.sex">
          <el-option label="女" value="女"></el-option>
          <el-option label="男" value="男"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属机构">
        <el-select v-model="filterData.mechansim">
          <el-option label="机构1" value="机构1"></el-option>
          <el-option label="机构2" value="机构2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住状态">
        <el-select v-model="filterData.status">
          <el-option label="入住" value="入住"></el-option>
          <el-option label="未入住" value="未入住"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
        <el-button type="danger" @click="reSet" icon="el-icon-refresh"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row class="testbox">
      <el-table
        border
        :data="
          (filterArray.length ? filterArray : tableData).slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="name"
          label="老人姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="mechansim"
          label="所属机构"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bedNum"
          label="床位号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="paterName"
          label="陪同人员姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="paterTel"
          label="陪同人员电话"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="goOutTime"
          label="外出时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="planTime"
          label="计划返回时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="realTime"
          label="实际返回时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="reason"
          label="外出原因"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="isReturn"
          label="是否已返回"
          width="150"
        >
        </el-table-column>
      </el-table>
    </el-row>

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

export default {
  name: "OutList",
  components: { Pagination },
  data() {
    return {
      tableData: [
        {
          name: "王小二", //姓名
          mechansim: "机构1", //所属机构
          bedNum: 2, //床位号
          paterName: "小红", //陪同人员姓名
          paterTel: "1348218528", //陪同人员电弧
          goOutTime: "2021-2-1 14:00", //外出时间
          planTime: "2021-2-1 17:00", //预计返回时间
          realTime: "2021-2-1 17:00", //实际返回时间
          reason: "去看儿子", //外出原因
          isReturn: "已返回", //是否已返回
        },
        {
          name: "王小虎", //姓名
          mechansim: "机构1", //所属机构
          bedNum: 2, //床位号
          paterName: "小红", //陪同人员姓名
          paterTel: "1348218528", //陪同人员电弧
          goOutTime: "2021-2-1 14:00", //外出时间
          planTime: "2021-2-1 17:00", //预计返回时间
          realTime: "2021-2-1 17:00", //实际返回时间
          reason: "去看儿子", //外出原因
          isReturn: "已返回", //是否已返回
        },
      ],
      currentPage: 1,
      pageSize: 5,
      totalNum: 10,
      filterData: {
        name: "",
        sex: "",
        mechansim: "",
        status: "",
      },
      filterArray: [],
    };
  },
  created() {
    this.totalNum = this.tableData.length;
    console.log(this.totalNum);
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
    // 查询信息提交
    onSubmit() {
      console.log(
        this.tableData.filter((value) => {
          return this.peatch(value);
        })
      );
      this.filterArray = this.tableData.filter((value) => {
        return this.peatch(value);
      });
    },
    reSet() {
      this.filterArray = [];
      this.filterData.name = "";
      this.filterData.sex = "";
      this.filterData.mechansim = "";
      this.filterData.status = "";
    },
    peatch(value) {
      if (
        this.filterData.name &&
        this.filterData.sex &&
        this.filterData.mechansim &&
        this.filterData.status
      ) {
        return (
          value.name === this.filterData.name &&
          value.sex === this.filterData.sex &&
          value.mechansim === this.filterData.mechansim &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex &&
        this.filterData.mechansim &&
        this.filterData.status === ""
      ) {
        return (
          value.name === this.filterData.name &&
          value.sex === this.filterData.sex &&
          value.mechansim === this.filterData.mechansim
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex === "" &&
        this.filterData.mechansim &&
        this.filterData.status
      ) {
        return (
          value.name === this.filterData.name &&
          value.mechansim === this.filterData.mechansim &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex &&
        this.filterData.mechansim &&
        this.filterData.status
      ) {
        return (
          value.sex === this.filterData.sex &&
          value.mechansim === this.filterData.mechansim &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex &&
        this.filterData.mechansim === "" &&
        this.filterData.status
      ) {
        return (
          value.name === this.filterData.name &&
          value.sex === this.filterData.sex &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex === "" &&
        this.filterData.mechansim &&
        this.filterData.status
      ) {
        return (
          value.mechansim === this.filterData.mechansim &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex &&
        this.filterData.mechansim === "" &&
        this.filterData.status
      ) {
        return (
          value.sex === this.filterData.sex &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex &&
        this.filterData.mechansim &&
        this.filterData.status === ""
      ) {
        return (
          this.filterData.sex === value.sex &&
          this.filterData.mechansim === velue.mechansim
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex === "" &&
        this.filterData.mechansim === "" &&
        this.filterData.status
      ) {
        return (
          value.name === this.filterData.name &&
          value.status === this.filterData.status
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex === "" &&
        this.filterData.mechansim &&
        this.filterData.status === ""
      ) {
        return (
          value.name === this.filterData.name &&
          value.mechansim === this.filterData.mechansim
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex &&
        this.filterData.mechansim === "" &&
        this.filterData.status === ""
      ) {
        return (
          value.name === this.filterData.name &&
          value.sex === this.filterData.sex
        );
      } else if (
        this.filterData.name &&
        this.filterData.sex === "" &&
        this.filterData.mechansim === "" &&
        this.filterData.status === ""
      ) {
        return value.name === this.filterData.name;
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex &&
        this.filterData.mechansim === "" &&
        this.filterData.status === ""
      ) {
        return value.sex === this.filterData.sex;
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex === "" &&
        this.filterData.mechansim &&
        this.filterData.status === ""
      ) {
        return value.mechansim === this.filterData.mechansim;
      } else if (
        this.filterData.name === "" &&
        this.filterData.sex === "" &&
        this.filterData.mechansim === "" &&
        this.filterData.status
      ) {
        return value.status === this.filterData.status;
      }
    },

    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/oldManInfo");
    },
  },
};
</script>

<style lang="scss" scoped>
.out-list {
  padding: 10px;
  .testbox {
    width: 1100px;
    /deep/ .el-table--scrollable-x .el-table__body-wrapper {
      overflow: auto !important;
    }
    /deep/.el-table__fixed-right-patch {
      background-color: #f5f7fa !important;
    }
  }
}
</style>