<template>
  <div class="line-graph ui-ele">
    <div class="title">ZH:USD-T</div>
    <div class="lw-chart marketCandleSticksGraph"></div>
    <div class="button-flex-organiser">
      <div :class="`btn compact${activeChartView === 'fit' ? ' active' : ''}`" @click="activeChartView = 'fit'">
        All
      </div>
      <div :class="`btn compact${activeChartView === 'default' ? ' active' : ''}`" @click="activeChartView = 'default'">
        Default
      </div>
      <div :class="`btn compact${activeChartView === '24hr' ? ' active' : ''}`" @click="activeChartView = '24hr'">
        24hrs
      </div>
      <div :class="`btn compact${activeChartView === '6hr' ? ' active' : ''}`" @click="activeChartView = '6hr'">
        6hrs
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
      height: 380,
      toolTipWidth: 80,
      toolTipHeight: 80,
      toolTipMargin: 15,
      activeChartView: '24hr',
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
      for (let i = 0; i < 3000; i++){
        let ts = new Date()
        ts.setFullYear(ts.getFullYear() - 1)
        ts = new Date(ts).getTime()
        let time = new Date(ts + (i * 86400000)).toISOString().split('T')[0]

        let open = Number(Number(8.37+ (1/(Math.floor(Math.random() * 100)))).toFixed(4))
        let high = Number(Number(open+.2).toFixed(4))
        let close = Number(Number(8.37+ (1/(Math.floor(Math.random() * 100)))).toFixed(4))
        let low = Number(Number(close-.05).toFixed(4))
        tmp.push({time: time, open:open, high:high, low:low, close:close})
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
    chartData() {
      this.buildChartUI()
    },
    uiSidebarCollapse() {
      this.chart.resize(this.width, this.height)
    },
    activeChartView(value) {
      let data = this.chartData
      let from50 = data && data.length > 2 ? new Date(data[Math.ceil(data.length / 2)].time).getTime() : 0
      switch (value) {
        case "fit":
          this.chart.timeScale().fitContent()
          break;
        case "half":
          this.chart.timeScale().setVisibleRange({
            from: from50,
            to: new Date(data[data.length-1].time).getTime() / 1000
          })
          break;
          case "24hr":
          this.chart.timeScale().setVisibleRange({
            from: new Date(data[data.length-24].time).getTime() / 1000,
            to: new Date(data[data.length-1].time).getTime() / 1000
          })
          break;
          case "6hr":
          this.chart.timeScale().setVisibleRange({
            from: new Date(data[data.length-6].time).getTime() / 1000,
            to: new Date(data[data.length-1].time).getTime() / 1000
          })
          break;
        case "default":
        default:
          this.chart.timeScale().resetTimeScale()
      }
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

      // const toolTip = document.createElement('div');
      // toolTip.classList.add("tooltip")
      // this.chartContainer.appendChild(toolTip);

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
      //     const data = param.seriesData.get(this.candlestickSeries);
      //     const price = data.value !== undefined ? data.value : data.close;
      //     toolTip.innerHTML = `
      //       <div>Hashrate</div>
      //       <div>${Math.round(100 * price) / 100} Th/s</div>
      //       <div>${param.time}</div>
      //     `;

      //     const coordinate = this.candlestickSeries.priceToCoordinate(price);
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
      let data = this.chartData
      this.chart.timeScale().setVisibleRange({
            from: new Date(data[data.length-24].time).getTime() / 1000,
            to: new Date(data[data.length-1].time).getTime() / 1000
          })
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

<style lang="scss">
.line-graph {
  // width: 100%;
  flex-grow: 1;
  padding: 30px;
  background: var(--neutral-9);
  border-radius: 30px;
  display: grid;
  gap: 10px;

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
}

.button-flex-organiser {
  display: flex;
  gap: 10px;
  margin-right: auto;
  width: auto;
}
</style>
