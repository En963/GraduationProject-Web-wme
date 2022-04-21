<template>
  <div id="map"></div>
</template>

<script>
import { MP } from "../map.js";

export default {
  name: "Map",
  data() {
    return {
      ak: "xqPXtxrTR8jeE1AB4Zh38ZdifzxnC3Vi",
    };
  },

  mounted() {
    this.$nextTick(() => {
      const _this = this;
      MP(_this.ak).then((BMap) => {
        _this.initMap();
      });
    });
  },
  methods: {
    initMap() {
      //   var map = new BMap.Map("map"); // 创建地图实例
      //   var point = new BMap.Point(116.404, 39.915); // 创建点坐标
      //   map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      //   map.enableScrollWheelZoom(true);

      var map = new BMap.Map("map");
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          // alert("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          alert("failed" + this.getStatus());
        }
      });
    },
  },
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>