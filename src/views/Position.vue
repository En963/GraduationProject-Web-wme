<template>
  <div class="position-box">
    <div class="select-box">
      <el-select v-model="elderUuid" placeholder="请选择">
        <el-option
          v-for="item in elderList"
          :key="item.elderUuid"
          :label="item.elderName"
          :value="item.elderUuid"
        >
        </el-option>
      </el-select>
    </div>
    <div class="map-content">
      <Map
        :latitude="latitude"
        :longitude="longitude"
        :elderUuid="elderUuid"
      ></Map>
    </div>
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import { get, post, deleteFn, host } from "../tools/request";
export default {
  name: "Position",
  components: { Map },
  data() {
    return {
      elderList: [],
      elderUuid: "",
      latitude: "", //纬度
      longitude: "", //经度
    };
  },
  mounted() {
    this.getOldManList();
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.position-box {
  padding: 10px;
  width: 1200px;
  margin: 0 auto;
  .select-box {
    display: flex;
    justify-content: center;
  }
  .map-content {
    margin-top: 20px;
    width: 100%;
    height: 600px;
  }
}
</style>