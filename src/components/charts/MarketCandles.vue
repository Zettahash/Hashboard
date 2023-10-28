<template>
  <div class="line-graph ui-ele">
    <div class="title">ZH:USD-T</div>
    <div class="tooltip"></div>
    <div class="lw-chart marketCandleSticksGraph"></div>
    <div class="button-flex-organiser">
      <div :class="`btn compact${activeChartView === 'fit' ? ' active' : ''}`" @click="activeChartView = 'fit'">
        All
      </div>
      <div :class="`btn compact${activeChartView === 'default' ? ' active' : ''}`" @click="activeChartView = 'default'">
        Default
      </div>
      <div :class="`btn compact${activeChartView === '30day' ? ' active' : ''}`" @click="activeChartView = '30'">
        30 days
      </div>
      <div :class="`btn compact${activeChartView === '7day' ? ' active' : ''}`" @click="activeChartView = '7'">
        7 days
      </div>
      <div :class="`btn compact${activeChartView === '1day' ? ' active' : ''}`" @click="activeChartView = '1'">
        24 hrs
      </div>
    </div>
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
  name: 'MarketCandles',
  data() {
    return {
      chart: false,
      chartContainer: false,
      candlestickSeries: false,
      height: 300,
      toolTipWidth: 80,
      toolTipHeight: 80,
      toolTipMargin: 15,
      activeChartView: '1day',
      currentBar: {
        open: null,
        high: null,
        low: null,
        close: null,
        time: Math.floor(Date.now() / 1000),
      },
      refreshInterval: false,
      chartDataObj:false,
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      payload: 'payload',
    }),
    chartData() {
      let tmp = []
      if (this.application.uiDemoValues) {
        let ts = new Date()
        ts.setFullYear(ts.getFullYear() - 1)
        ts = new Date(ts).getTime()
        for (let i = 0; i < (180 * 24); i++) {
          let time = ts + (i * (3600000))//Math.floor(( ts + (i * (3600000)))/1000)//.toISOString().split('T')[0]

          let open = Number(Number(8.37 + (1 / (Math.floor(Math.random() * 100)))).toFixed(4))
          let high = Number(Number(open + (1 / (Math.floor(Math.random() * 100)))).toFixed(4))
          let close = Number(Number(8.37 + (1 / (Math.floor(Math.random() * 100)))).toFixed(4))
          let low = Number(Number(high - (1 / (Math.floor(Math.random() * 100)))).toFixed(4))
          tmp.push({ time: Math.floor(time / 1000), open: open, high: high, low: low, close: close })
        }
      }
      else {
        clearInterval(this.refreshInterval)
      }
      return tmp
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
        priceScale: {
          autoScale: true,
        },
        rightPriceScale: {
          borderColor: '#434343',
        },
        timeScale: {
          borderColor: '#434343',
          secondsVisible: false,
          timeVisible: true,
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
    chartData() {
      this.buildChartUI()
    },
    uiSidebarCollapse() {
      this.chart.resize(this.width, this.height)
    },
    activeChartView(value) {

      this.setActiveChartView(value)
    },
  },
  methods: {
    buildChartUI() {
      this.chartContainer.innerHTML = ''
      this.chart = createChart(this.chartContainer, this.chartOptions);
      this.candlestickSeries = this.chart.addCandlestickSeries({
        topColor: '#0062ff',
        bottomColor: 'rgba(0, 98, 255, 0)',
        lineColor: '#0062ff',
        lineWidth: 1,
      });
      this.candlestickSeries.setData(this.chartData)
      this.chart.resize(this.width, this.height);

      const toolTip = document.querySelector(".tooltip")

      this.chart.subscribeCrosshairMove(param => {
        toolTip.classList.add("active")
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > this.chartContainer.clientWidth ||
          param.point.y < 0 ||
          param.point.y > this.chartContainer.clientHeight
        ) {
          toolTip.classList.add("active")
        } else {
          const data = param.seriesData.get(this.candlestickSeries);
          const price = data.value !== undefined ? data.value : data.close;
          toolTip.innerHTML = `
            <div>ZH : USD-T trading</div>
            <div>1 : ${price * .01}</div>
            <div>${new Date(param.time * 1000)}</div>
          `;
        }
      });
      this.chartDataObj = this.chartData
      let data = this.chartDataObj
      this.chart.timeScale().setVisibleRange({
        from: data[data.length - (1 * 24)].time,
        to: data[data.length - 1].time
      })
      this.refreshNewDataInterval()
    },
    mergeTickToBar(price) {
      if (this.currentBar.open === null) {
        this.currentBar.open = price;
        this.currentBar.high = price;
        this.currentBar.low = price;
        this.currentBar.close = price;
      } else {
        this.currentBar.close = price;
        this.currentBar.high = Math.max(this.currentBar.high, price);
        this.currentBar.low = Math.min(this.currentBar.low, price);
      }
      let time = this.currentBar.time + 200
      this.currentBar.time = time
      this.candlestickSeries.update(this.currentBar);
      this.chartDataObj.push(this.currentBar)
      this.setActiveChartView(this.activeChartView)
    },
    refreshNewDataInterval() {
      clearInterval(this.refreshInterval)
      let self = this
      this.refreshInterval = setInterval(function () {
        let open = Number(Number(8.37 + (1 / (Math.floor(Math.random() * 100)))).toFixed(4))
        self.mergeTickToBar(open);
      },2000)
    },
    setActiveChartView(value) {
      let data = this.chartDataObj
      let from =  false
      let from50 = data && data.length > 2 ? data[Math.ceil(data.length / 2)].time : 0
      if (!isNaN(Number(value))) {
        let targetTime = Math.floor((Date.now() - (value * (24*3600000)))/1000)
        for (let i = data.length - 1; i >= 0; i--) {
          let instance = data[i].time
          if (instance <= targetTime) {
            from = instance
            break
          }
        }
      }
      switch (value) {
        case "fit":
          this.chart.timeScale().fitContent()
          break;
        case "half":
          this.chart.timeScale().setVisibleRange({
            from: from50,
            to: data[data.length - 1].time
          })
          break;
        case "30":
        case "7":
        case "1":
          this.chart.timeScale().setVisibleRange({
            from: from,
            to: data[data.length - 1].time
          })
          break;
        case "default":
        default:
          this.chart.timeScale().resetTimeScale()
      }
    },
  },
    mounted() {
      this.chartContainer = document.querySelector(".marketCandleSticksGraph")
      this.buildChartUI()
      let self = this
      window.addEventListener('resize', () => {
        self.chart.resize(self.width, self.height);
      })
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

  .tooltip {
    // width: 120px;
    height: max-content;
    // position: absolute;
    // display: none;
    grid-row: 2/3;
    // padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    // font-size: 12px;
    // background-color: var(--neutral-10);
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
}

.button-flex-organiser {
  display: flex;
  gap: 10px;
  margin-right: auto;
  width: auto;
}
</style>
