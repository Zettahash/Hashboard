<template>
  <div class="line-graph ui-ele">
    <!-- <div class="title">SHA256 Hash-rate (PH/s)</div> -->
    <LineGraph :data="data" :options="options" />
  </div>

</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as LineGraph } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const col = ['#00ffbf', '#009be7', '#0062ff', ]
export default {
  name: 'HashRateChart',
  components: {
    LineGraph
  },
  data() {
    return {
      data: {
        labels: ['Increment 1', 'Increment 2', 'Increment 3', 'Increment 4', 'Increment 5'],
        datasets: this.randomDatasets()
      },
      options: {
        responsive: true,
        borderColor: '#0062ff',
        tension: .2,
        maintainAspectRatio: false,
        color: '#fff',
        fill: true,
      }
    }
  },
  methods: {
    randomDatasets() {
      let tmp = []
      for (let i = 0; i < 3; i++) {
        tmp.push({
    borderColor: col[i],
    backgroundColor: (ctx) => {
      const canvas = ctx.chart.ctx;
      const gradient = canvas.createLinearGradient(0, 0, 0, 500);
      gradient.addColorStop(0, `${col[i]}75`);
      gradient.addColorStop(1, `${col[i]}00`);
      return gradient;
    },
    label: 'Dataset ' + i,
    data: Array.from({length: 5}, () => Math.floor(Math.random() * 10))

  })
      }
return tmp
    },
  },
}
</script>

<style lang="scss" scoped>
.line-graph {
  width: 100%;
  max-height: 50vh;
  flex-grow: 1;
  // padding: 30px;
  // background: var(--neutral-9);
  // border-radius: 30px;
  display: grid;
  contain: strict;
  height: 500px;
}
</style>