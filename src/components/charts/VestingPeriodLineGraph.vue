<template>
  <div>
    <VestingPeriodHeaderRecipient :vested="vested" />
    <div class="line-graph ui-ele">
      <VestingPeriodChartStats :vested="vested" :now="now" />
      <div class="graph-wrapper">
        <LineGraph :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>

</template>

<script>
import VestingPeriodChartStats from '@/components/charts/VestingPeriodChartStats'
import VestingPeriodHeaderRecipient from '@/components/modules/VestingPeriodHeaderRecipient'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line as LineGraph } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
)

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

export default {
  name: 'VestingPeriodLineGraph',
  components: {
    LineGraph,
    VestingPeriodChartStats,
    VestingPeriodHeaderRecipient,
  },
  data() {
    return {
      data: {
        labels: false,
        datasets: [
          {
            label: 'Vested',
            data: false,
            backgroundColor: ['#5265dd'],
            borderColor: '#06124d',
            tension: 0,
            fontColor: '#fff',
            borderWidth: 3,
            borderDash: [10, 10],
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: true,
            stepped: 'before',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { display: false, },
          x: { ticks: { color: '#b8cefb', }, grid: { color: "transparent" } }
        },
        plugins: {
          legend: {
            display: false
          },
        },
        annotations: {
          cliff1: {
            type: 'line',
            borderColor: '#061e50',
            borderWidth: 2,
            borderDash: [12, 12],
            label: {
              backgroundColor: '#0d2c6f',
              content: false,
              display: true
            },
            scaleID: 'x',
            value: false
          },
          end1: {
            type: 'line',
            borderColor: '#061e50',
            borderWidth: 2,
            borderDash: [12, 12],
            label: {
              backgroundColor: '#0d2c6f',
              content: false,
              display: true
            },
            scaleID: 'x',
            value: false
          },
        },
      }
    }
  },
  props: {
    vested: Array,
    now: Number,
  },
  computed: {
    chartData() {
      let data = this.data
      let labelsValues = this.calculatedDates
      data.labels = labelsValues.labels
      data.datasets[0].data = labelsValues.values
      return data
    },
    chartOptions() {
      let options = this.options
      let cliff = new Date(Number(this.vested.cliffDate) * 1000)
      let cliffIndex = `${months[cliff.getMonth()]} ${cliff.getFullYear()}`
      let end = new Date(Number(this.vested.end) * 1000)
      let endIndex = `${months[end.getMonth()]} ${end.getFullYear()}`

      options.annotations.cliff1.value = this.calculatedDates.labels.indexOf(cliffIndex)
      options.annotations.cliff1.label.content = `Cliff: ${cliff.getDate()} / ${months[cliff.getMonth()]} / ${cliff.getFullYear()}`

      options.annotations.end1.value = this.calculatedDates.labels.indexOf(endIndex)
      options.annotations.end1.label.content = `Fully Vested: ${end.getDate()} / ${months[end.getMonth()]} / ${end.getFullYear()}`
      return options
    },
    calculatedDates() {
      let cliff = Number(this.vested.cliffDate)
      let rate = Number(this.vested.rate)
      let labels = []
      let values = []
      let dates = []
      let increment = Number(this.vested.period)
      let start = Number(this.vested.start)
      let end = Number(this.vested.end)
      let val = 0
      for (let i = start; i <= end + increment; i += increment) {
        labels.push(i)

        if (i >= cliff && i <= end) {
          val += rate
          values.push(val)
        }
        else {
          values.push(val)
        }
        for (let j = 0; j <= 2; j++) {
          let nth = increment / 4
          labels.push(i + (nth * j))
          let e = new Date((i + (nth * j)) * 1000)
          e = `${months[e.getMonth()]} ${e.getFullYear()}`
          dates.push(e)
          values.push(val)
        }
        let d = new Date(i * 1000)
        d = `${months[d.getMonth()]} ${d.getFullYear()}`
        dates.push(d)
      }
      // labels.sort((a, b) => { return a > b ? 1 : -1 })
      return { labels: dates, values: values }
    },
  },
}
</script>

<style lang="scss" scoped>
.line-graph {
  width: 100%;
  flex-grow: 1;
  padding: 30px;
  background: var(--neutral-5);
  border-radius: 8px;
  display: grid;

  .graph-wrapper {
    width: 100%;

    contain: strict;
    max-height: 50vh;
    height: 280px;
  }
}

.line-graph {
  .flex {
    gap: 30px;

    .col {
      gap: 0;
    }
  }

  .subtle {
    opacity: .5;
    font-size: 12px;
    font-weight: 200;
  }

  .main {
    font-weight: 600;
  }
}
</style>