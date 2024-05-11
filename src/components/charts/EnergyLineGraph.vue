<template>
  <div class="line-graph ui-ele">
    <div class="title">Energy (kW)<br><small>*data interpolated</small></div>
    <div class="tooltip"></div>
    <div class="lw-chart profitHistory"></div>
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
            time: (new Date(item.date).getTime() / 1000) + i,
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
    height() {
      return window.innerHeight <= 800 ? 380 : (window.innerHeight>1200?480:window.innerHeight*.4)
    },
    chartData() {
      let tmp = []
      if (this.payload.energyRateChart) {
        for (const item of this.payload.hashrateChart.value) {
          tmp.push({
            time: item.timestamp,
            value: (item.energyRate * 1000000000000)
          })
        }
      } else {
        tmp = false
      }
      return tmp
    },
  },
  watch: {
    chartData(value) {
      if (value) { this.buildChartUI() }
    },
    uiSidebarCollapse() {
      this.chart.resize(this.width, this.height)
    },
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
  border-radius: $radius2;
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
