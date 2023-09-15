<template>
  <div class="line-graph">
    <div class="title">SHA256 Pool Statistics</div>
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

export default {
  name: 'PoolStats',
  components: {
    LineGraph
  },
  data() {
    return {
      data: {
        labels: ['23.00', '00.00', '01.00', '02.00', '03.00', '04.00', '05.00'],
        datasets: [
          {
            label: 'SHA256 Pool 1',
            backgroundColor: '#09815c',
            borderColor: '#09815c',
            data: [1000, 1000, 790, 800, 890, 900, 900]
          },
          {
            label: 'SHA256 Pool 2',
            backgroundColor: '#586ada',
            borderColor: '#586ada',
            data: [500, 500, 300, 300, 450, 450, 500]
          },
          {
            label: 'SHA256 Pool 3',
            backgroundColor: '#067ab8',
            borderColor: '#067ab8',
            data: [50, 50, 1000, 700, 800, 900, 900]
          }
        ]
      },
      options: {
        responsive: true,
        tension: .5,
        maintainAspectRatio: false,
        color: '#fff',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line-graph{
  width: 100%;
  max-height: 50vh;
  flex-grow: 1;
  padding: 30px;
  background: var(--neutral-9);
  border-radius: 30px;
  display: grid;
  contain: strict;
  height: 500px;
  // canvas{
  //   height:100%;
  //   width:100%;
  // }
}
</style>