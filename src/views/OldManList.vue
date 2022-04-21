<template>
  <div class="old-list">
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
      <el-table-column align="center" prop="name" label="老人姓名" width="100">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别" width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="personNum"
        label="身份证号码"
        width="160"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="isLogin"
        label="是否完成登记"
        width="110"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="入住状态"
        width="100"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="beginTime"
        label="入住开始时间"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="loginTime"
        label="登记时间"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="mechansim" label="部门" width="100">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  name: "OldManList",
  components: { Pagination },
  data() {
    return {
      tableData: [
        {
          name: "王小二", //姓名
          sex: "男", //性别
          personNum: "34122120011112606X".substr(0, 3) + "***************", //身份证
          isLogin: "否", //是否登记
          status: "入住", //入住状态
          beginTime: "2022-1-2", //入住开始时间
          loginTime: "2022-1-2", //登记时间
          mechansim: "机构1", //部门
        },
        {
          name: "王小虎", //姓名
          sex: "男", //性别
          personNum: "34122120011112606X".substr(0, 3) + "***************", //身份证
          isLogin: "否", //是否登记
          status: "入住", //入住状态
          beginTime: "2022-1-2", //入住开始时间
          loginTime: "2022-1-2", //登记时间
          mechansim: "机构1", //部门
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
.old-list {
  padding: 10px;
}
</style>