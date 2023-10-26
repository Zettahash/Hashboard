<template>
  <LineGraph :data="data" :options="options" class="ui-ele"/>
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
  name: 'AssetsStats',
  components: {
    LineGraph
  },
  props: ['dataValues', 'colour'],
  data() {
    return {
      data: {
        labels: this.dataValues,
        datasets: [
          {
            borderWidth: 1,
            data: this.dataValues,
        fill: true,
        backgroundColor: this.colour,
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0
          }
        },
        animation: {
          duration: 0
        },
        responsive: true,
        backgroundColor: this.colour,
        borderColor: this.colour,
        tension: .2,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {

  },
}
</script>
