<template>
  <div class="map1">
    <div id="map1" style="width:800px;height:500px;border:1px solid green;"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
require("echarts/extension/bmap/bmap");
export default {
  name: "map1",
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.map1();
  },
  methods: {
    map1() {
      let $this = this;
      const option = {
        bmap: {
          // center: [104.114129, 37.550339],
          center:[113.65, 34.76],
          zoom: 12,
          roam: true,
          // mapStyle: {
          //   styleJson: [
          //     {
          //       featureType: "water",
          //       elementType: "all",
          //       stylers: {
          //         color: "#044161"
          //       }
          //     },
          //     {
          //       featureType: "land",
          //       elementType: "all",
          //       stylers: {
          //         color: "#004981"
          //       }
          //     },
          //     {
          //       featureType: "boundary",
          //       elementType: "geometry",
          //       stylers: {
          //         color: "#064f85"
          //       }
          //     },
          //     {
          //       featureType: "railway",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "highway",
          //       elementType: "geometry",
          //       stylers: {
          //         color: "#004981"
          //       }
          //     },
          //     {
          //       featureType: "highway",
          //       elementType: "geometry.fill",
          //       stylers: {
          //         color: "#005b96",
          //         lightness: 1
          //       }
          //     },
          //     {
          //       featureType: "highway",
          //       elementType: "labels",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "arterial",
          //       elementType: "geometry",
          //       stylers: {
          //         color: "#004981"
          //       }
          //     },
          //     {
          //       featureType: "arterial",
          //       elementType: "geometry.fill",
          //       stylers: {
          //         color: "#00508b"
          //       }
          //     },
          //     {
          //       featureType: "poi",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "green",
          //       elementType: "all",
          //       stylers: {
          //         color: "#056197",
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "subway",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "manmade",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "local",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "arterial",
          //       elementType: "labels",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     },
          //     {
          //       featureType: "boundary",
          //       elementType: "geometry.fill",
          //       stylers: {
          //         color: "#029fd4"
          //       }
          //     },
          //     {
          //       featureType: "building",
          //       elementType: "all",
          //       stylers: {
          //         color: "#1a5787"
          //       }
          //     },
          //     {
          //       featureType: "label",
          //       elementType: "all",
          //       stylers: {
          //         visibility: "off"
          //       }
          //     }
          //   ]
          // }
        },
        
        series: [
          // {
          //   type: "scatter",
          //   coordinateSystem: "bmap",
          //   // data: data
          // }
          // {
          //   name: "分布图",
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   data: convertData(data),
          //   itemStyle: {
          //     color: "#46f1fd"
          //   }
          // }
        ]
      };

      let chart = $this.$echarts.init(document.getElementById("map1"));
      // chart.clear();
      // chart.resize();
      chart.setOption(option);
    }
  },
  watch: {}
};
</script>
<style lang='' scoped>
</style>