<template>
  <div class="add-healthy-box">
    <div class="btn-group">
      <el-button type="primary">添加</el-button>
      <el-button>编辑</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddHealthy",
};
</script>

<style lang="scss" scoped>
.add-healthy-box {
  width: 375px;
  padding: 10px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
  }

  //   height: 100px;
  //   background: pink;
}
</style>