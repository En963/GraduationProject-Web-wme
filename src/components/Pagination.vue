<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPageTemp"
      :page-sizes="[5, 10]"
      :page-size="pageSizeTemp"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 1000,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageSizeTemp: this.pageSize,
      currentPageTemp: this.currentPage,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSizeTemp = val; //动态改变
      this.$emit("change-pagesize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPageTemp = val; //动态改变
      this.$emit("change-currentpage", val);
    },
  },
};
</script>