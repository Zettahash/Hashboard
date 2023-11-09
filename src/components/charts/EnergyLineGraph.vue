<template>
  <div class="line-graph ui-ele">
    <div class="title">Energy (kW)<br><small>*data interpolated</small></div>
    <div class="tooltip"></div>
    <div class="lw-chart profitHistory"></div>
    <!-- <div class="button-flex-organiser">
      <div :class="`btn compact${activeChartView === 'fit' ? ' active' : ''}`" @click="activeChartView = 'fit'">
        All
      </div>
      <div :class="`btn compact${activeChartView === 'half' ? ' active' : ''}`" @click="activeChartView = 'half'">
        Half
      </div>
      <div :class="`btn compact${activeChartView === 'default' ? ' active' : ''}`" @click="activeChartView = 'default'">
        Default
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  createChart
} from 'lightweight-charts';
import {
  mapGetters
} from 'vuex';
export default {
  name: 'EnergyLineGraph',
  data() {
    return {
      chart: false,
      chartContainer: false,
      lineSeries: false,
      areaSeries: false,
      height: 480,
      toolTipWidth: 80,
      toolTipHeight: 80,
      toolTipMargin: 15,
      activeChartView: 'default',
      boundedResize: false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      payload: 'payload',
    }),
    energyRate() {
      let tmp = []
      if (this.payload.profitHistory && this.payload.profitHistory.value) {
        let i = 1
        for (const item of this.payload.profitHistory.value.data) {
          tmp.push({
            time: (new Date(item.date).getTime() / 1000) + i, //.split("T")[0],
            value: (Number(item.hashrate)/ 100000000000000)*2
          })
          i++
        }
      } else {
        tmp = false
      }
      return tmp.reverse()
    },
    chartOptions() {
      let crossHair = this.chart ? (this.chart.CrosshairMode ? this.chart.CrosshairMode.Normal : false) : false
      return {
        layout: {
          background: {
            type: 'solid',
            color: '#141414',
          },
          textColor: '#434343',
        },
        grid: {
          vertLines: {
            color: '#262626',
          },
          horzLines: {
            color: '#262626',
          },
        },
        rightPriceScale: {
          borderColor: '#434343',
        },
        timeScale: {
          borderColor: '#434343',
        },
        crosshair: {
          mode: crossHair,
        },
      }
    },
    uiSidebarCollapse() {
      return this.application.uiSidebarCollapse
    },
    width() {
      return this.uiSidebarCollapse ? window.innerWidth - 100 : window.innerWidth - 400
    },
  },
  watch: {
    chartData(value) {
      if (value) { this.buildChartUI() }
    },
    uiSidebarCollapse() {
      this.chart.resize(this.width, this.height)
    },
    // activeChartView(value) {
    //   let data = this.chartData
    //   let from50 = data && data.length > 2 ? data[Math.ceil(data.length / 2)].time : 0
    //   switch (value) {
    //     case "fit":
    //       this.chart.timeScale().fitContent()
    //       break;
    //     case "half":
    //       this.chart.timeScale().setVisibleRange({
    //         from: from50,
    //         to: Date.now() / 1000
    //       })
    //       break;
    //     case "default":
    //     default:
    //       this.chart.timeScale().resetTimeScale()
    //   }
    // },
  },
  methods: {
    buildChartUI() {
      this.chartContainer.innerHTML = ''
      this.chart = createChart(this.chartContainer, this.chartOptions);

      this.areaSeries = this.chart.addAreaSeries({
        topColor: '#0062ff',
        bottomColor: 'rgba(0, 0, 0, 0)',
        lineColor: '#0062ff',
        lineWidth: 1,
      }).setData(this.energyRate)


      this.chart.resize(this.width, this.height);
      this.chart.timeScale().fitContent()
      // const toolTip = document.querySelector('.tooltip');
      // this.chart.subscribeCrosshairMove(param => {
      //   if (
      //     param.point === undefined ||
      //     !param.time ||
      //     param.point.x < 0 ||
      //     param.point.x > this.chartContainer.clientWidth ||
      //     param.point.y < 0 ||
      //     param.point.y > this.chartContainer.clientHeight
      //   ) {
      //     toolTip.classList.remove("active");
      //   } else {
      //     toolTip.classList.add("active")
      //     const data = param.seriesData.get(this.areaSeries);
      //     const rate = data.value;
      //     toolTip.innerHTML = `
      //       <div>Energy Consumption</div>
      //       <div>${rate} kW</div>
      //       <div>${String(new Date(param.time * 1000)).split("GMT")[0]}</div>
      //     `;

      //     const coordinate = this.areaSeries.priceToCoordinate(rate);
      //     let shiftedCoordinate = param.point.x - 50;
      //     if (coordinate === null) {
      //       return;
      //     }
      //     shiftedCoordinate = Math.max(
      //       0,
      //       Math.min(this.chartContainer.clientWidth - this.toolTipWidth, shiftedCoordinate)
      //     );
      //     const coordinateY =
      //       coordinate - this.toolTipHeight - this.toolTipMargin > 0 ?
      //         coordinate - this.toolTipHeight - this.toolTipMargin :
      //         Math.max(
      //           0,
      //           Math.min(
      //             this.chartContainer.clientHeight - this.toolTipHeight - this.toolTipMargin,
      //             coordinate + this.toolTipMargin
      //           )
      //         );
      //     toolTip.style.left = shiftedCoordinate + 'px';
      //     toolTip.style.top = coordinateY + 'px';
      //   }
      // });
    },
    resizeChart() {
      this.chart.resize(this.width, this.height)
    }
  },
  mounted() {
    this.chartContainer = document.querySelector(".profitHistory")
    this.buildChartUI()
    this.boundedResize = this.resizeChart.bind(this)
    window.addEventListener('resize', this.boundedResize)
  },
}
</script>

<style lang="scss" scoped>
.line-graph {
  // width: 100%;
  flex-grow: 1;
  padding: 30px;
  background: var(--neutral-9);
  border-radius: 30px;
  display: grid;
  gap: 10px;


}

.tooltip {
  width: 120px;
  height: max-content;
  position: absolute;
  display: none;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: var(--neutral-10);
  text-align: left;
  z-index: 1000;
  top: 12px;
  left: 12px;
  pointer-events: none;

  &.active {
    display: grid;
    gap: 5px;
  }

  div {
    &:nth-of-type(2) {
      font-weight: 800;
    }
  }
}

.button-flex-organiser {
  display: flex;
  gap: 10px;
  margin-right: auto;
  width: auto;
}
</style>
