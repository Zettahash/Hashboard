<template>
  <div class="line-graph ui-ele">
  <div class="title">SHA256 Hash-rate (PH/s)</div>
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
  name: 'HashRateChart',
  components: {
    LineGraph
  },
  data() {
    return {
      data: {
        labels: ['23.00', '00.00', '01.00', '02.00', '03.00', '04.00', '05.00'],
        datasets: [
          {
            label: 'SHA256 Hash-rate (PH/s)',
            // color: '#0062ff',
            data: [1000, 1000, 790, 800, 890, 900, 900]
          }
        ]
      },
      options: {
        responsive: true,
        backgroundColor: '#0062ff',
        borderColor: '#0062ff',
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