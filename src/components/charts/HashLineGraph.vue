<template>
  <div class="line-graph ui-ele">
    <div class="title">SHA256 Hash-rate (PH/s)</div>
    <div class="lw-chart hashrateChart"></div>
    <div class="button-flex-organiser">
      <div :class="`btn compact${activeChartView === 'fit' ? ' active' : ''}`" @click="activeChartView = 'fit'">
        All
      </div>
      <div :class="`btn compact${activeChartView === 'half' ? ' active' : ''}`" @click="activeChartView = 'half'">
        Half
      </div>
      <div :class="`btn compact${activeChartView === 'default' ? ' active' : ''}`" @click="activeChartView = 'default'">
        Default
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
  name: 'HashLineGraph',
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
      if (this.payload.hashrateChart) {
        for (const item of this.payload.hashrateChart.value) {
          tmp.push({
            time: item.timestamp, //.split("T")[0],
            value: (item.hashrate * 1000000000000)
          })
        }
      } else {
        tmp = false
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
      let from50 = data&&data.length>2?data[Math.ceil(data.length/2)].time:0
      switch (value) {
        case "fit":
          this.chart.timeScale().fitContent()
          break;
        case "half":
          this.chart.timeScale().setVisibleRange({
            from: from50,
            to: Date.now() / 1000
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
      this.areaSeries = this.chart.addAreaSeries({
        topColor: '#0062ff',
        bottomColor: 'rgba(0, 98, 255, 0)',
        lineColor: '#0062ff',
        lineWidth: 1,
      });
      this.areaSeries.setData(this.chartData)
      this.chart.resize(this.width, this.height);

      const toolTip = document.createElement('div');
      toolTip.classList.add("tooltip")
      this.chartContainer.appendChild(toolTip);

      this.chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > this.chartContainer.clientWidth ||
          param.point.y < 0 ||
          param.point.y > this.chartContainer.clientHeight
        ) {
          toolTip.classList.remove("active");
        } else {
          toolTip.classList.add("active")
          const data = param.seriesData.get(this.areaSeries);
          const price = data.value !== undefined ? data.value : data.close;
          toolTip.innerHTML = `
            <div>Hashrate</div>
            <div>${Math.round(100 * price) / 100} Th/s</div>
            <div>${String(new Date(param.time * 1000)).split("GMT")[0]}</div>
          `;

          const coordinate = this.areaSeries.priceToCoordinate(price);
          let shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(this.chartContainer.clientWidth - this.toolTipWidth, shiftedCoordinate)
          );
          const coordinateY =
            coordinate - this.toolTipHeight - this.toolTipMargin > 0 ?
              coordinate - this.toolTipHeight - this.toolTipMargin :
              Math.max(
                0,
                Math.min(
                  this.chartContainer.clientHeight - this.toolTipHeight - this.toolTipMargin,
                  coordinate + this.toolTipMargin
                )
              );
          toolTip.style.left = shiftedCoordinate + 'px';
          toolTip.style.top = coordinateY + 'px';
        }
      });
    },
  },
  mounted() {
    this.chartContainer = document.querySelector(".hashrateChart")
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
